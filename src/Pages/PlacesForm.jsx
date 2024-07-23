import React, { useContext, useEffect, useState } from "react";
import {
  addPlace,
  getPlace,
  updatePlace,
  uploadImage,
  uploadImageByLink,
} from "../apis";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import AccountNav from "./AccountNav";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [descrcription, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [price, setPrice] = useState(0);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const addImageByLink = async (e) => {
    e.preventDefault();
    try {
      const image = await uploadImageByLink(photoLink);
      setAddedPhotos((prev) => {
        return [...prev, image.data];
      });
    } catch (error) {
      console.log(error);
    }
    setPhotoLink("");
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const response = await uploadImage(data);
    console.log(response);
    setAddedPhotos((prev) => {
      return [...prev, ...response.data];
    });
  };

  const handlePerksChange = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setPerks((prevPerks) => [...prevPerks, name]);
    } else {
      setPerks((prevPerks) => prevPerks.filter((item) => item !== name));
    }
  };

  const savePlace = async (e) => {
    e.preventDefault();
    try {
      const body = {
        owner: user.userId,
        title: title,
        address: address,
        photos: addedPhotos,
        description: descrcription,
        perks: perks,
        extraInfo: extraInfo,
        checkIn: checkIn,
        checkOut: checkOut,
        maxGuests: maxGuest,
        price: price,
      };
      if (id) {
        await updatePlace({ ...body, id: id });
      } else {
        await addPlace(body);
      }
      navigate("/account/places");
    } catch (error) {
      console.log(error);
    }
  };

  const GetPlace = async () => {
    try {
      const resp = await getPlace(id);
      setTitle(resp.data.title);
      setAddress(resp.data.address);
      setAddedPhotos(resp.data.photos);
      setDescription(resp.data.description);
      setPerks(resp.data.perks);
      setExtraInfo(resp.data.extraInfo);
      setCheckIn(resp.data.checkIn);
      setCheckOut(resp.data.checkOut);
      setMaxGuest(resp.data.maxGuests);
      setPrice(resp.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const removePhoto = (ev, image) => {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== image)]);
  };

  const setAsMain = (ev, image) => {
    ev.preventDefault();
    setAddedPhotos([image, ...addedPhotos.filter((photo) => photo !== image)]);
  };

  useEffect(() => {
    if (id) {
      GetPlace();
    }
  }, [id]);

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4 font-semibold">Title</h2>
        <p className="text-gray-500 text-sm">
          Title for your palce, should be short and catchy as in advertisement
        </p>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        <h2 className="text-2xl mt-4 font-semibold">Address</h2>
        <p className="text-gray-500 text-sm">Address to this place</p>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        <h2 className="text-2xl mt-4 font-semibold">Photos</h2>
        <p className="text-gray-500 text-sm">more=better</p>
        <div className="flex gap-4">
          <input
            type="text"
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
            placeholder="add using a link....jpg"
          />
          <button
            className="rounded-2xl font-semibold  w-[20%]"
            onClick={addImageByLink}
          >
            Add photo
          </button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.map((image, index) => {
            return (
              <div className="h-32 flex relative" key={index}>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${image}`}
                  alt="place"
                  className="rounded-2xl object-cover w-full"
                  key={image}
                />
                <button
                  onClick={(ev) => removePhoto(ev, image)}
                  className="absolute bottom-1 right-1 text-white rounded-xl p-1 bg-black bg-opacity-70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={(ev) => setAsMain(ev, image)}
                  className="absolute bottom-1 left-1 text-white rounded-xl p-1 bg-black bg-opacity-70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={`${index === 0 ? "white" : "none"}`}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
          <label className="h-32 flex gap-1 bg-transparent border justify-center items-center rounded-2xl text-2xl text-gray-500">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden cursor-pointer"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Upload
          </label>
        </div>
        <h2 className="text-2xl mt-4 font-semibold">Description</h2>
        <p className="text-gray-500 text-sm">Description of this place</p>
        <textarea
          value={descrcription}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <h2 className="text-2xl mt-4 font-semibold">Perks</h2>
        <p className="text-gray-500 text-sm">Select all the perks</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
          <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
            <input
              type="checkbox"
              name="wifi"
              onChange={handlePerksChange}
              checked={perks.includes("wifi")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
              />
            </svg>
            <span>Wifi</span>
          </label>
          <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
            <input
              type="checkbox"
              name="Free parking spot"
              checked={perks.includes("Free parking spot")}
              onChange={handlePerksChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <span>Free parking spot</span>
          </label>
          <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
            <input
              type="checkbox"
              name="TV"
              checked={perks.includes("TV")}
              onChange={handlePerksChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            <span>TV</span>
          </label>
          <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
            <input
              type="checkbox"
              name="Radio"
              checked={perks.includes("Radio")}
              onChange={handlePerksChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
            <span>Radio</span>
          </label>
          <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
            <input
              type="checkbox"
              name="Pets"
              checked={perks.includes("Pets")}
              onChange={handlePerksChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            <span>Pets</span>
          </label>
          <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
            <input
              type="checkbox"
              name="Private Entrance"
              checked={perks.includes("Private Entrance")}
              onChange={handlePerksChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
            <span>Private Entrance</span>
          </label>
        </div>
        <h2 className="text-2xl mt-4 font-semibold">Extra Info</h2>
        <p className="text-gray-500 text-sm">House rules, etc</p>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        <h2 className="text-2xl mt-4 font-semibold">
          Check in&out times,max guest
        </h2>
        <p className="text-gray-500 text-sm">
          Add check in out times,remember to have some time window for cleaning
          the room between guests
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1 font-semibold">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 font-semibold">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 font-semibold">Max number of guest</h3>
            <input
              type="number"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 font-semibold">Price</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary font-semibold my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
