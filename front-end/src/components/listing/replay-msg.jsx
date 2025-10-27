import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useMsg } from "../alert/alert-provider";
const ReplayMessage = ({ listingId, chatId }) => {
  const [reply, setReply] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const { setAlert } = useMsg();

  if (!reply) {
    return (
      <div>
        <Button variant="text" type="button" onClick={() => setReply(!reply)}>
          Replay
        </Button>
      </div>
    );
  }

  // handler of form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const formData = new FormData(e.target);
    const chat = Object.fromEntries(formData);
    axios
      .post(`/api/chat/listingId/${listingId}/chatId/${chatId}`, chat)
      .then((res) => {
        console.log(res.data);
        setDisableBtn(false);
        location.reload();
      })
      .catch((err) => {
        console.error(err.response.data);
        const { msg, type } = err.response.data;
        setAlert([msg, type, true]);
        setDisableBtn(false);
      });
  };

  return (
    <div className="post-review">
      <form onSubmit={handleSubmit} className="post-review-form">
        {/* <div className="div1">
            <RatingComp />
          </div> */}
        <div className="div1">
          <TextField
            size="small"
            id="standard-basic"
            label="message"
            variant="outlined"
            name="msg"
          />
        </div>
        <div className="div2">
          <Button
            variant="outlined"
            type="button"
            onClick={() => setReply(!reply)}
          >
            close
          </Button>
          <Button variant="outlined" type="submit" disabled={disableBtn}>
            replay
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReplayMessage;
