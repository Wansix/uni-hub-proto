import React from "react";

export const Mymenu = () => {
  return (
    <div className="myMenu">
      <div className="myMenu-registerForm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="myMenu-registerForm__item">
            <input type="text" name="nickName" placeholder="nickName" />
          </div>
          <div className="myMenu-registerForm__item">
            <input type="text" name="profileId" placeholder="profileId" />
          </div>

          <input type="submit" value="Create"></input>
        </form>
      </div>
    </div>
  );
};

export default Mymenu;
