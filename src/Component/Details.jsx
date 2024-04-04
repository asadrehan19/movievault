import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./details.css";
import Error from "./ErrorPage";
import { doc, getDoc, collection } from "firebase/firestore";
import { fireStoreInstance } from "../fireStore/fireStore";
import StarRatings from "react-star-ratings";
import { Bars } from "react-loader-spinner";
import Reviews from "./reviews";

const Detail = () => {
  const { id } = useParams();
  const setNewRating = (rating) =>
    this.props.dispatch(fooActions.setRating(rating));

  const [details, setDetails] = useState({
    title: "",
    year: "",
    image: "",
    movieLink: "",
    description: "",
    previousRatting: 3,
    totalUserRatted: 5,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getId() {
      setLoading(true);
      const docRef = doc(collection(fireStoreInstance, "movies"), id);
      const docs = await getDoc(docRef);
      setLoading(false);
      setDetails(docs.data().formData);
    }
    getId();
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ marginLeft: "47%", marginTop: "15%" }}>
          <Bars height={50} width={50} color="#FFFFFF" />
        </div>
      ) : (
        <div className="detailContainer flex flex-wrap " key={details.id}>
          {/* image div */}
          <div>
            <img className="imageDiv" src={details.image} alt="" />
          </div>
          {/* movie title */}
          <div className="titlediv flex flex-wrap">
            <h2>Name: {details.title}</h2>
          </div>
          {/* Movie Ratting */}
          <div className="starRatting">
            <span
              style={{ color: "white", marginLeft: "-43px", fontWeight: "700" }}
            >
              Ratting:{" "}
            </span>
            <StarRatings
              changeRating={setNewRating}
              rating={details.previousRatting}
              starRatedColor="yellow"
              starHoverColor="yellow"
              starDimension="25px"
              starSpacing="10px"
              isSelectable={true}
            />
          </div>
          {/* Movie description */}
          <div className="descriptionDiv">
            <h2 className="descriptionTitle">Description</h2>
            <p>{details.description}</p>
          </div>
          {/* download link */}
          <div className="buttonDiv flex">
            <Link to={details.movieLink}>
              <button className="btn btn-danger">Download</button>{" "}
            </Link>
            <br />
            <Link to={details.movieLink}>
              <button className="btn btn-primary">Read more...</button>
            </Link>
          </div>
          <div className="reviews">
            <Reviews
              id={id}
              previousRatting={details.previousRatting}
              totalUserRatted={details.totalUserRatted}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Detail;
