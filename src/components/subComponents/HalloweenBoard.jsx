import React from "react";
import Broom from "./Broom.jsx";
import "../../styles/sub-styles/broom.css";

function HalloweenBoard() {
  return (
    <>
      <img
        src="/pictures/general/halloween/board-halloween.png"
        alt="halloween-board-game"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "130px",
          top: "2px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "66px",
          top: "105px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "130px",
          top: "105px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "130px",
          top: "262px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "130px",
          top: "367px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "66px",
          top: "471px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "312px",
          top: "262px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "312px",
          top: "159px",
        }}
      />

      <img
        src="/pictures/general/halloween/pumpkin-1.png"
        alt="pumpkin1"
        className="shaking-pumpkin"
        style={{
          left: "250px",
          top: "525px",
        }}
      />

      <div style={{ position: "absolute", left: "5px", top: "165px" }}>
        <Broom />
      </div>
      <div style={{ position: "absolute", left: "192px", top: "54px" }}>
        <Broom />
      </div>
      <div style={{ position: "absolute", left: "129px", top: "420px" }}>
        <Broom />
      </div>
      <div
        style={{
          position: "absolute",
          left: "244px",
          top: "270px",
          transform: "rotateY(180deg)",
        }}
      >
        <Broom />
      </div>
    </>
  );
}

export default HalloweenBoard;
