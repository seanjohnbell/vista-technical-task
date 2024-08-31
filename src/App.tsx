import { useRef, useState } from "react";
import "./App.scss";
import Button from "./Button";

function App() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordingStartTime, setRecordingStartTime] = useState<Date>(new Date());
  const [recordingLength, setRecordingLength] = useState<string>("");
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const calculateRecordingLength = () => {
    const currentTime = new Date();
    let differenceSeconds = Math.abs(Math.round((currentTime.getTime() - recordingStartTime?.getTime()) / 1000));

    return `${(
      differenceSeconds / 60 > 1 ? `${Math.abs(Math.round(differenceSeconds / 60))}m`: ""
    )} ${(
      differenceSeconds % 60 !== 0) ? `${Math.abs(Math.round(differenceSeconds % 60))}s` : ""}`;
  }

  const stopRecording = () => {
    setRecording(false);
    setRecordingLength(calculateRecordingLength());
    answerRef.current?.focus();
  }

  const startRecording = () => {
    setRecording(true);
    setRecordingLength("");
    setRecordingStartTime(new Date());
  }

  const reviewRecording = () =>
    alert(`You recorded for: ${recordingLength.trim()}`);

  const submit = () =>
    alert(`Submitted a recording with a length of ${recordingLength.trim()}.\n\nCongratulations!`);

  return (
    <div className="App">
      {/* Main Container */}
      <div>
        <h3>Say the vocabulary words.</h3>
        {/* Button Container */}
        <div className="buttons-wrapper">
          <Button variant="Stop" label="Stop" onClick={stopRecording} disabled={!recording} />
          <Button variant="Record" label="Record" onClick={startRecording} active={recording} />
          <Button variant="Review" label="Review your recording" onClick={reviewRecording} disabled={recordingLength === ""} />
        </div>
        {/* End Button Container */}
        <textarea rows={4} ref={answerRef} />
        {/* Final Answer Container */}
        <>
          <h4>Is this your final answer?</h4>
          {/* Submit Container */}
          <div className="submit-wrapper">
            <div className="radio-wrapper">
              <input
                id="true"
                type="radio"
                name="confirm"
                value="true"
                onChange={() => setConfirm(true)}
                aria-label="True Final Answer"
                disabled={recordingLength === ""}
              />
              <label htmlFor="true">True</label>
            </div>
            <div className="radio-wrapper">
              <input
                id="false"
                type="radio"
                name="confirm"
                value="false"
                onChange={() => setConfirm(false)}
                aria-label="False Final Answer"
                disabled={recordingLength === ""}
              />
              <label htmlFor="false">False</label>
            </div>
          </div>
          {/* End Submit Container */}
          <button type="submit" disabled={!confirm} className="submit-button" onClick={submit}>Submit</button>
        </>
        {/* End Final Answer Container */}
      </div>
      {/* End Main Container */}
    </div>
  );
}

export default App;
