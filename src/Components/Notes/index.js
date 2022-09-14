import React from "react";

function Notes({ data }) {
  return (
    <>
      <li className="notepad-infos">
        <div>
          <strong>{data.title}</strong>
          <div>
            x
          </div>
        </div>
        <textarea defaultValue={data.notes}></textarea>
        <spam>!</spam>
      </li>
    </>
  )
}

export default Notes;