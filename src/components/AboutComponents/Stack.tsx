// I M P O R T:   F I L E S
import "../../styles/stack.scss";

// I M P O R T:   P A C K A G E S
import Tilt from "react-parallax-tilt";

// I M P O R T:   F U N C T I O N S

// C O D E
const Stack = () => {
  return (
    <div className="stack">
      <section id="stack">
        <h1>Stack</h1>
        <div>
          <Tilt
            className="parallax-effect-glare-scale"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
            gyroscope={true}
          >
            <div className="inner-element">
              <div>React</div>
              <div>Parallax Tilt</div>
              <div>👀</div>
            </div>
          </Tilt>
        </div>
      </section>
    </div>
  );
};

export default Stack;
