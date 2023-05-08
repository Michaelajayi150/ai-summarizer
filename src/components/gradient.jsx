import { useEffect, useState } from "react";

function Gradient() {
  const [gradient, setGradient] = useState({
    firstColor: 61,
    secondColor: 72,
  });

  const [rotation, setRotation] = useState({
    firstRotation: "27% 37%",
    secondRotation: "97% 21%",
    thirdRotation: "52% 99%",
    fourthRotation: "10% 29%",
    fifthRotation: "97% 96%",
    sixthRotation: "33% 50%",
    seventhRotation: "79% 53%",
  });

  useEffect(() => {
    const rotateColorAxis = (key, x, y) => {
      let x_coord = parseInt(x) + 1;
      if (parseInt(x) >= 360) {
        x_coord = 0;
      }

      let y_coord = parseInt(y) + 1;
      if (parseInt(y) >= 360) {
        y_coord = 0;
      }

      setRotation((prev) => ({
        ...prev,
        [key]: `${x_coord}%, ${y_coord}%`,
      }));
    };

    const interval = setInterval(() => {
      setGradient((prev) => ({
        firstColor: prev.firstColor === 0 ? 61 : prev.firstColor - 1,
        secondColor: prev.secondColor === 0 ? 72 : prev.secondColor - 1,
      }));

      rotateColorAxis(
        "firstRotation",
        rotation.firstRotation.split(" ")[0],
        rotation.firstRotation.split(" ")[1]
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [rotation.firstRotation]);

  return (
    <section>
      <div
        style={{
          backgroundImage: `radial-gradient(at ${
            rotation.firstRotation
          },hsla(215, 98%, ${
            gradient.firstColor
          }%, 1) 0px,transparent 0%),radial-gradient(at ${
            rotation.secondRotation
          }, hsla(125, 98%, ${
            gradient.secondColor
          }%, 1) 0px, transparent 50%),radial-gradient(at ${
            rotation.thirdRotation
          }, hsla(354, 98%, ${
            gradient.firstColor
          }%, 1) 0px, transparent 50%),radial-gradient(at ${
            rotation.fourthRotation
          }, hsla(256, 96%, ${
            gradient.firstColor + 5
          }%, 1) 0px, transparent 50%),radial-gradient(at ${
            rotation.fifthRotation
          }, hsla(38, 60%, ${
            gradient.secondColor + 2
          }%, 1) 0px, transparent 50%),radial-gradient(at ${
            rotation.sixthRotation
          }, hsla(222, 67%, ${
            gradient.secondColor + 1
          }%, 1) 0px, transparent 50%),radial-gradient(at ${
            rotation.seventhRotation
          }, hsla(343, 68%, ${
            gradient.secondColor + 7
          }%, 1) 0px, transparent 50%)`,
        }}
        className="gradient"
      />
    </section>
  );
}

export default Gradient;
