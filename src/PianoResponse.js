import React, { useEffect, useState } from 'react'

const PianoResponse = () => {
    const [notes, setNotes] = useState("");

    const fetchNotes = () => {
        const notesLength = Math.floor(Math.random() * 100);
        fetch(`http://localhost:8280/modelgr2music/g/A/${notesLength}/0.8`)
            .then(data => {
                return data.json();
            })
            .then(data => {
                setNotes(data);
            })
            .catch(err => {
                alert(err)
            });
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (

        <div>
            <div class="generate-notes">
                <button onClick={() => fetchNotes()}>Générer des notes</button>
            </div>
            <p class="set-of-notes">{notes}</p>
        </div>
    )
}

export default PianoResponse;