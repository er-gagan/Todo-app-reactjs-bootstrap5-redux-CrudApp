import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loading = () => {
    const [progress, setProgress] = useState(0)

    return (
        <div>
            <LoadingBar
                height={4}
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <button onClick={() => setProgress(10)}>Add 10%</button>
            <button onClick={() => setProgress(20)}>Add 20%</button>
            <button onClick={() => setProgress(40)}>Add 40%</button>
            <button onClick={() => setProgress(50)}>Add 50%</button>
            <button onClick={() => setProgress(70)}>Add 70%</button>
            <button onClick={() => setProgress(90)}>Add 90%</button>
            <button onClick={() => setProgress(100)}>Complete</button>
            <br />
        </div>
    )
}

export default Loading
