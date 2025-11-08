import axios from "axios";
import { useEffect, useState } from "react";
import { useMsg } from "../alert/alert-provider";
import { useParams, useNavigate } from "react-router";
import Map from "./map";
import PostReview from "./post-review";
import ReplayMessage from "./replay-msg";
import { useAuth } from "../../AuthProvider";
// import { FaTrash } from "react-icons/fa6";

const Listing = () => {
  const { setAlert } = useMsg();
  const { isAuthenticated, user } = useAuth();
  let { id } = useParams();
  const [accessToken, setAccessToken] = useState(null);
  const [listing, setListing] = useState([]);
  const navigate = useNavigate();
  const { title, description, location, image, price, chats, createdBy } =
    listing;
  const [loading, setLoading] = useState(true); // Add loading state

  // const handleDeleteReview = (id, reviewId) => {
  //   axios
  //     .delete(`/api/review//${id}/${reviewId}`)
  //     .then((res) => {
  //       const { updatedListing } = res.data;
  //       setListing(updatedListing);
  //     })
  //     .catch((err) => {
  //       console.error(err.response.data);
  //     });
  // };

  useEffect(() => {
    axios
      .get(`/api/listings/${id}`)
      .then((res) => {
        console.log(res.data.listing);
        setListing(res.data.listing);
        setAccessToken(res.data.accessToken);
        setLoading(false);
      })
      .catch((err) => {
        const { msg, type } = err.response.data;
        setAlert([msg, type, true]);
        navigate("/");
      });
    return;
  }, []);

  if (loading) {
    return (
      <div className="listing">
        <div>loading...</div>
      </div>
    );
  }
  return (
    <div className="listing">
      <h4 style={{ textAlign: "center", margin: "0.5rem 0" }}>{title}</h4>
      <div className="content-map-container">
        <div className="content">
          <div className="img">
            <img src={image.url} alt={image.filename} />
          </div>
          <div className="content-description">
            <div>{description}</div>
            <div> &#8377; {price.toLocaleString()}</div>
            <div>{location.value + ", " + location.country}</div>
          </div>
          <div>
            {isAuthenticated && createdBy === user?._id && (
              // set listing as sold button
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  try {
                    const res = await axios.put(
                      `/api/listings/listingId/${id}?sold=${!listing.sold}`
                    );
                    const { listing: updatedListing, msg, type } = res.data;
                    setListing(updatedListing);
                    setAlert([msg, type, true]);
                  } catch (err) {
                    const { msg, type } = err.response.data;
                    setAlert([msg, type, true]);
                  }
                }}
              >
                Set Listing as {listing.sold ? "Available" : "Sold"}
              </button>
            )}
          </div>
        </div>
        <div className="map">
          <Map
            accessToken={accessToken}
            coordinates={location.geometry.coordinates}
          />
          <PostReview setListing={setListing} createdBy={createdBy} id={id} />
        </div>
      </div>
      <div className="reviews-container">
        {chats.map(({ messages, _id }) => {
          return (
            <div className="review" key={_id}>
              <div className="messages-container">
                {messages.map(({ username, msg }, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign:
                        isAuthenticated && username === user?.username
                          ? "right"
                          : "left",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.5rem",
                      }}
                    >
                      <strong>
                        {isAuthenticated && username === user?.username
                          ? "You"
                          : username}
                        :
                      </strong>
                      {msg}
                    </span>
                  </div>
                ))}
              </div>
              {isAuthenticated && <ReplayMessage listingId={id} chatId={_id} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listing;
