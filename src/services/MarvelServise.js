import {useHttp} from '../hooks/http.hook'

const  useMarvelServise = () => {
    const {loading, request, error, clearError } = useHttp();
    const _apiBase ='https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=82477d8aac8eb77310f291535efd0984';
    const _baseOffset = 310;
    

    const getAllChar = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(item => _transforChar(item)) 
    }
    const getChar  = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        console.log(res)
        return _transforChar(res.data.results[0]) 
    }

    const _transforChar = (char) => {
        return {
            name: char.name,
            description: char.description === '' ? 'No description' : char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
    return {loading, error, getAllChar, getChar, clearError}
}

export default useMarvelServise;
