import { Routes, Route } from "react-router-dom";
import PlayDetail from "./PlayDetail";
import PlayList from "./PlayList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PlayHome() {
    const [musics, setMusics] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost/Christmas_final/api/Music.php")
            .then((response) => {
                setMusics(response.data);
            })
            .catch((error) => {
                console.error("Error ", error);
            });

    }, []);

    return (
        <Routes>
            <Route index element={<PlayList musics={musics} />} />
            <Route path="play-detail/:id" element={<PlayDetail />} />
        </Routes>
    );
}
