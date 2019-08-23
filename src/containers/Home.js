import React, { useEffect } from 'react';
import PosterSlider from '../components/PosterSlider';
import MovieContent from '../components/MovieContent';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as SearchActions from '../actions/SearchActions';
import authToken from '../config';

export default function Home() {

    const dispatch = useDispatch();
    const searchByMovie = `https://api.themoviedb.org/3/search/movie?api_key=${authToken}&language=en-US&query=batman&page=1&include_adult=true`

    const fetchData = url => {
        return dispatch => {
            dispatch(SearchActions.isLoading(true));

            axios(url)
                .then(res => {
                    dispatch(SearchActions.isLoading(false));
                    return res;
                })
                .then(res => {
                    console.log(res.data);
                    dispatch(SearchActions.searchSuccess(res.data, res.data.results))
                })
                .catch(() => dispatch(SearchActions.searchError(true)))

        }
    };

    useEffect(() => {
        dispatch(fetchData(searchByMovie));
    }, [searchByMovie]);
   

    return (
        <>
            <PosterSlider />
        </>
    )
}