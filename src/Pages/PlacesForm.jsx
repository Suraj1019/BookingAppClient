import React, { useContext, useEffect, useState } from "react";
import {
  addPlace,
  getPlace,
  updatePlace,
  uploadImage,
  uploadImageByLink,
} from "../Services/apis";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import AccountNav from "../Components/AccountNav";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import UploadIcon from "../Assets/UploadIcon";
import DeleteIcon from "../Assets/DeleteIcon";
import StarIcon from "../Assets/StarIcon";
import WifiIcon from "../Assets/WifiIcon";
import VehicleIcon from "../Assets/VehicleIcon";
import TVIcon from "../Assets/TVIcon";
import RadioIcon from "../Assets/RadioIcon";
import PetsIcon from "../Assets/PetsIcon";
import EntranceIcon from "../Assets/EntranceIcon";

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
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const addImageByLink = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      const resp = await uploadImageByLink(photoLink);
      setAddedPhotos((prev) => {
        return [...prev, resp.data.data.url];
      });
      toast.success(resp?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setShowLoader(false);
    }
    setPhotoLink("");
  };

  const handleImageChange = async (e) => {
    try {
      setShowLoader(true);
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      const resp = await uploadImage(data);
      setAddedPhotos((prev) => {
        return [...prev, ...resp.data.data];
      });
      toast.success(resp?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setShowLoader(false);
    }
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
        const resp = await updatePlace({ ...body, id: id });
        toast.success(resp?.data?.message);
      } else {
        const resp = await addPlace(body);
        toast.success(resp?.data?.message);
      }
      navigate("/account/places");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
      );
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
      setShowLoader(true);
      const GetPlace = async () => {
        try {
          const resp = await getPlace(id);
          setTitle(resp.data.data.title);
          setAddress(resp.data.data.address);
          setAddedPhotos(resp.data.data.photos);
          setDescription(resp.data.data.description);
          setPerks(resp.data.data.perks);
          setExtraInfo(resp.data.data.extraInfo);
          setCheckIn(resp.data.data.checkIn);
          setCheckOut(resp.data.data.checkOut);
          setMaxGuest(resp.data.data.maxGuests);
          setPrice(resp.data.data.price);
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong. Please try again.",
          );
        } finally {
          setShowLoader(false);
        }
      };
      GetPlace();
    }
  }, [id]);

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <div>
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
        </div>
        <div>
          <h2 className="text-2xl mt-4 font-semibold">Address</h2>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="address"
          />
        </div>
        <div>
          <div>
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
          </div>
          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.map((image, index) => {
              return (
                <div className="h-32 flex relative" key={index}>
                  <img
                    src={image}
                    alt="place"
                    className="rounded-2xl object-cover w-full"
                    key={image}
                  />
                  <button
                    onClick={(ev) => removePhoto(ev, image)}
                    className="absolute bottom-1 right-1 text-white rounded-xl p-1 bg-black bg-opacity-70"
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    onClick={(ev) => setAsMain(ev, image)}
                    className="absolute bottom-1 left-1 text-white rounded-xl p-1 bg-black bg-opacity-70"
                  >
                    <StarIcon index={index} />
                  </button>
                </div>
              );
            })}
            <label className="h-32 flex gap-1 bg-transparent border justify-center items-center rounded-2xl text-2xl text-gray-500 cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <UploadIcon />
              <span>Upload</span>
            </label>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mt-4 font-semibold">Description</h2>
          <p className="text-gray-500 text-sm">Description of this place</p>
          <textarea
            value={descrcription}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>
        <div>
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
              <WifiIcon />
              <span>Wifi</span>
            </label>
            <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
              <input
                type="checkbox"
                name="Free parking spot"
                checked={perks.includes("Free parking spot")}
                onChange={handlePerksChange}
              />
              <VehicleIcon />
              <span>Free parking spot</span>
            </label>
            <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
              <input
                type="checkbox"
                name="TV"
                checked={perks.includes("TV")}
                onChange={handlePerksChange}
              />
              <TVIcon />
              <span>TV</span>
            </label>
            <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
              <input
                type="checkbox"
                name="Radio"
                checked={perks.includes("Radio")}
                onChange={handlePerksChange}
              />
              <RadioIcon />
              <span>Radio</span>
            </label>
            <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
              <input
                type="checkbox"
                name="Pets"
                checked={perks.includes("Pets")}
                onChange={handlePerksChange}
              />
              <PetsIcon />
              <span>Pets</span>
            </label>
            <label className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer">
              <input
                type="checkbox"
                name="Private Entrance"
                checked={perks.includes("Private Entrance")}
                onChange={handlePerksChange}
              />
              <EntranceIcon />
              <span>Private Entrance</span>
            </label>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mt-4 font-semibold">Extra Info</h2>
          <p className="text-gray-500 text-sm">House rules, etc</p>
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
        </div>
        <div>
          <h2 className="text-2xl mt-4 font-semibold">
            Check in&out times,max guest
          </h2>
          <p className="text-gray-500 text-sm">
            Add check in out times,remember to have some time window for
            cleaning the room between guests
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
        </div>
        <button className="primary font-semibold my-4">Save</button>
      </form>
      {showLoader && <Loader />}
    </div>
  );
};

export default PlacesFormPage;
