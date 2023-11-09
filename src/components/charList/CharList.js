import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import Error from '../error/error'

import useMarvelServise from '../../services/MarvelServise';

import './charList.scss';

   


const CharList = ({onСhoice}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [offset, setOffset] = useState(310)
    const [newItemLoading, SetNewItemLoading] = useState(false)
    const [charEnded, setCharEnded] = useState(false)

    

    const marverlSer = useMarvelServise()

    useEffect(() => {
        onRequest()
    }, []);

    useEffect(() => {
        fetch('https://www.random.org/integers/?num=1&min=-50&max=50&col=1&base=10&format=plain&rnd=new')
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])



    const onRequest = (offset) => {
        onCharListLoading()
        marverlSer.getAllChar(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        SetNewItemLoading(true)
    }


    const onCharListLoaded = (newData) => {
        let ended = false;
        if (newData.length < 9) {
            ended = true;
        }

        setData(data => [...data, ...newData]);
        setLoading(loading => false);
        SetNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }
    


    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const itemRefs = useRef([])

   

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItem = (chars) => {
        let imgStyle = {'objectFit' : 'cover'};
        if (chars.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }
        chars = chars.map(({id,thumbnail,name,}, i) => {
            return (
                    <li className="char__item" 
                        key = {id}
                        ref={el => itemRefs.current[i] = el}
                        onClick = {
                            () => {
                                
                                onСhoice(id)
                                focusOnItem(i)
                            }
                        }
                        >
                        
                            
                        <img src={thumbnail} alt="abyss" style = {imgStyle}/>
                        <div className="char__name">{name}</div>
                    </li>
                )
        })

        return (
                <ul className="char__grid">
                    {chars}
                </ul>
        )
    }

    
    
    
    const spiner = loading ? <Spinner/> : null;
    const errorMasseg = error ? <Error/> : null;
    const content = !(loading || error) ? renderItem(data) : null;

    return (
        <div className="char__list">
            {spiner}
            {content}
            {errorMasseg}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;