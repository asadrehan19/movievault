import { useEffect, useState } from "react";
import { fireStoreInstance } from "../fireStore/fireStore";
import { TailSpin } from "react-loader-spinner";
import { ReviewRef } from "../fireStore/fireStore";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import "./reviews.css";
import StarRatings from "react-star-ratings";
import swal from "sweetalert";
const Reviews = ({ id, previousRatting, totalUserRatted }) => {
  const setNewRating = (rating) =>
    this.props.dispatch(fooActions.setRating(rating));
  const [review, setReview] = useState("");
  const [ratting, setRating] = useState(0);
  const [tailSpin, setTailspin] = useState(false);
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     async function getData() {
  //       const queryRef = query(ReviewRef, where("movie", "==", id));
  //       const querrySnapShot = await getDocs(queryRef);
  //       console.log(querrySnapShot);
  //       querrySnapShot.forEach((doc) => {
  //         setData((pre) => [...pre, doc.data()]);
  //       });
  //     }
  //     getData();
  //   }, []);
  const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const userData = await getDocs(collection(fireStoreInstance, "reviews"));
      userData.forEach((docs) => setUserReview(docs.data()));
      //   setUserReview(docs.data())
    }
    getReviews();
  }, []);

  const addReviews = async () => {
    try {
      setTailspin(true);
      await addDoc(collection(fireStoreInstance, "reviews"), {
        movie: id,
        ratting: ratting,
        reviewTime: new Date().getTime(),
        userReview: review,
        username: "professor asad",
      });
      const docRefUpdate = doc(fireStoreInstance, "movies", id);
      await updateDoc(docRefUpdate, {
        ratting: previousRatting + ratting,
        totalUserRatted: totalUserRatted + 1,
      });
      try {
        swal({
          title: "review sent",
          icon: "success",
          button: true,
          timer: 2000,
        });
      } catch {
        swal({
          title: "review send failed",
          icon: "error",
          button: true,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setTailspin(false);
  };
  return (
    <>
      {/* Get Reviews */}
      <div className="reviewContainer">
        <input
          className="reviewInput"
          type="text"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Enter your review"
        />
        <div className="starRattingReview">
          <StarRatings
            onChange={(rate) => setRating(rate)}
            changeRating={setNewRating}
            rating={0}
            half={true}
            starRatedColor="yellow"
            starHoverColor="yellow"
            starDimension="15px"
            starSpacing="5px"
            isSelectable={true}
          />
        </div>
        <button className="btn btn-success ownbtn" onClick={addReviews}>
          {tailSpin ? <TailSpin height={20} color="white" /> : "Share"}
        </button>
      </div>

      {/* Show Reviews */}
      {/* <h2 style={{ color: "white" }}>Reviews</h2> */}
      <div className="showReviewsContainer">
        {/* UnderSession Start */}
        <div className="underReviewsSession">
          <h2 className="reviewsName">Name : {userReview.username}</h2>
          {/* StarRatting session */}
          <div className="starRattingReview">
            <StarRatings
              changeRating={setNewRating}
              rating={4}
              half={true}
              starRatedColor="yellow"
              starHoverColor="yellow"
              starDimension="15px"
              starSpacing="5px"
              isSelectable={true}
              value={ratting}
              onChange={(rate) => setRating(rate)}
            />
          </div>
          {/* StarRatting session end */}

          {/* UserData Session */}
          <div className="userData">
            <p style={{ color: "white", marginLeft: "5px" }}>
              {userReview.userReview}
            </p>
          </div>
          {/* UserData Session End */}
        </div>
        {/* Under Session end */}
      </div>
    </>
  );
};
export default Reviews;
