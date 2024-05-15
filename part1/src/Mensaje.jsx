import PropTypes from "prop-types";

function Mensaje({ color }) {
  const persona = [
    { name: "agustin", edad: 23 },
    { name: "lionel", edad: 36 },
  ];

  return (
    <div>
      <h1 style={{ color: color }}>
        {persona[0].name} {persona[0].edad}
        <br />
        {persona[1].name} {persona[1].edad}
      </h1>
    </div>
  );
}

Mensaje.propTypes = {
  color: PropTypes.string,
};

export default Mensaje;
