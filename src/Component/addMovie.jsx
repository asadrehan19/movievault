import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc, collection } from "firebase/firestore";
import { fireStoreInstance } from "../fireStore/fireStore";
import swal from "sweetalert";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    image: "",
    movieLink: "",
    description: "",
    ratting: 2,
    totalUserRatting: 5,
  });

  const [loading, setLoading] = useState(false);

  const movieSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(fireStoreInstance, "movies"), { formData });
      try {
        swal({
          title: "Successfully Added",
          icon: "success",
          button: true,
          timer: 2000,
        });
      } catch {
        swal({
          title: "Added Failed",
          icon: "error",
          button: true,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      title: "",
      year: "",
      image: "",
      movieLink: "",
      description: "",
    });
    setLoading(false);
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="mx-auto h-2 w-auto text[white]">Add Movie</h3>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[crimson] ">
            Add Movie
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white "
              >
                Movie Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block text-base w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white "
                >
                  Movie Year
                </label>
              </div>
              <div>
                <input
                  type="text"
                  autoComplete="current-password"
                  required
                  className="block text-base w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.year}
                  onChange={(e) => {
                    setFormData({ ...formData, year: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white "
                >
                  Movie Image
                </label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  className="block text-base w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white "
                >
                  Movie Link
                </label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  className="block text-base w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.movieLink}
                  onChange={(e) => {
                    setFormData({ ...formData, movieLink: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white "
                >
                  Description
                </label>
              </div>
              <div>
                <textarea
                  required
                  className="block text-base w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={movieSubmit}
                className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <TailSpin height={25} color="white" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddMovie;
