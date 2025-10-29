import React from "react";
import Image from "./image";
import TimeInAgo from "./time-in-ago";
import { Link } from "react-router";

const Card = ({ listing }) => {
  const { _id, title, image, sold, createdAt } = listing;
  return (
    <div style={{ width: "20rem", position: "relative", margin: "0.5rem" }}>
      {sold && (
        <span
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            backgroundColor: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          }}
        >
          sold
        </span>
      )}
      <Link
        to={`/listing/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Image
          image={image}
          imgWidth="20rem"
          imgHeight="15rem"
          imgObjFit="cover"
        />
        <h4
          style={{
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h4>
        <TimeInAgo createdAt={createdAt} />
      </Link>
    </div>
  );
};

export default Card;
