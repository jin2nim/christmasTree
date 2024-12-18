import "../../css/playList.css"
import { useNavigate } from "react-router-dom";
//a parameter of "isProfile = false" is for profile page
export default function PlayList({ musics, isProfile = false }) {

    const navigate = useNavigate();
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    function truncateString(str, endIdx) {
        if (str.length > endIdx) {
            return str.substring(0, endIdx) + '...';
        } else {
            return str;
        }
    }

    return (
        <>
            <div id="playList" className="row justify-content-center align-items-start g-2 mt-3 w-full">
                <div className="col-11">
                    {/* display h1 only for Playlist page */}
                    {!isProfile && <h1>PlayList</h1>}
                    <table>
                        <tbody>
                            {musics.map((music) => {
                                return (
                                    <tr key={music.id} onClick={() => {
                                        navigate(`/play/play-detail/${music.id}`)
                                    }}>
                                        <td style={{ width: '50px', padding: '8px 0' }}>
                                            <div className="play-icon">
                                                <img src={`${process.env.PUBLIC_URL}/svg/playIcon.svg`} alt="MERRY CHRISTMAS" />
                                            </div>
                                        </td>
                                        <td className="albumImg"><img src={`${process.env.PUBLIC_URL}/${music.img}`} alt="MERRY cHRISTMAS" /></td>
                                        <td ><p style={{ fontWeight: 700 }}>{truncateString(music.name, 20)}</p><p>{music.artist}</p></td>
                                        <td style={{ textAlign: 'center' }}>{formatTime(music.duration)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
