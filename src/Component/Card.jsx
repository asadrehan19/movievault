import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { getDocs, collection } from "firebase/firestore";
import { Bars } from "react-loader-spinner";
import { fireStoreInstance } from "../fireStore/fireStore";
import { Link } from "react-router-dom";
import "./card.css";

function Card() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const data = await getDocs(collection(fireStoreInstance, "movies"));
      data.forEach(
        (doc) =>
          // console.log(
          //   doc._document.data.value.mapValue.fields.formData.mapValue.fields
          // ),
          // console.log(doc.data().formData),
          // setData(doc.data().formData)
          setData((pre) => [...pre, { ...doc.data().formData, id: doc.id }])
        // setData((previous) => [...previous, doc.data()])
      );
      setLoading(false);
    }
    getData();
  }, []);

  const setNewRating = (rating) =>
    this.props.dispatch(fooActions.setRating(rating));

  // const mymedia = () => {
  //   const style = {
  //     "@media(max-width: 320px)": {
  //       height: "fitContent",
  //       marginLeft: "40px",
  //       backgroundColor: "red",
  //     },
  //   };
  // };

  return (
    <div className=" flex flex-wrap ">
      {loading ? (
        <div style={{ margin: "auto", marginTop: "15%" }}>
          <Bars height={50} width={50} color="#FFFFFF" />
        </div>
      ) : (
        data.map((e, i) => (
          <Link to={`/moviedetail/${e.id}`}>
            {" "}
            <div
              key={i}
              className="bgCard card mt-3 w-60 h-72 ml-3 hover:scale-105 duration-150 rounded-sm cursor-pointer bg-slate-900"
              // style={{ height: "fit-content", @mediaScreen and (min-width: 320px) and (max-width: 350px) bg-slate-900}}
              style={{ height: "fit-content", marginLeft: "48px" }}
            >
              <img
                src={e.image}
                alt=""
                // className="movieImage sm:mt-0.5 sm:ml-2 sm:absolute left-8 sm:w-64 sm:h-80"
                className="movieImage"
              />
              <div className="movieDetail">
                <h2 className=" ml-1">
                  <span className="text-red-500">Name: </span>
                  <span className="text-gray-400">{e.title}</span>
                </h2>
                <h2 className=" ml-1">
                  <span className="text-red-500">Rating: </span>{" "}
                  <StarRatings
                    changeRating={setNewRating}
                    //   value={setNewRating}
                    rating={4}
                    starRatedColor="yellow"
                    starHoverColor="yellow"
                    starDimension="15px"
                    starSpacing="7px"
                    isSelectable={true}
                  />
                </h2>
                <h2 className=" ml-1 color-white">
                  <span className="text-red-500">Year: </span>
                  <span className="text-gray-400">{e.year}</span>
                </h2>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Card;
