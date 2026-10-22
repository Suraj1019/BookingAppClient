import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),
  address: Yup.string()
    .trim()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),
  photos: Yup.array().min(1, "Add at least one photo"),
  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  perks: Yup.array(),
  extraInfo: Yup.string()
    .trim()
    .min(3, "Extra Info must be at least 3 characters")
    .required("Extra Info is required"),
  checkIn: Yup.string()
    .matches(TIME_REGEX, "Enter a valid time")
    .required("Check in time is required"),
  checkOut: Yup.string()
    .matches(TIME_REGEX, "Enter a valid time")
    .required("Check out time is required"),
  maxGuests: Yup.number()
    .typeError("Enter a valid number")
    .integer("Must be a whole number")
    .min(1, "At least 1 guest")
    .required("Max guests is required"),
  price: Yup.number()
    .typeError("Enter a valid number")
    .min(1, "Price must be greater than 0")
    .required("Price is required"),
});

const defaultValues = {
  title: "",
  address: "",
  photos: [],
  description: "",
  perks: [],
  extraInfo: "",
  checkIn: "",
  checkOut: "",
  maxGuests: "",
  price: "",
};

const PERKS = [
  { name: "wifi", label: "Wifi", Icon: WifiIcon },
  { name: "Free parking spot", label: "Free parking spot", Icon: VehicleIcon },
  { name: "TV", label: "TV", Icon: TVIcon },
  { name: "Radio", label: "Radio", Icon: RadioIcon },
  { name: "Pets", label: "Pets", Icon: PetsIcon },
  { name: "Private Entrance", label: "Private Entrance", Icon: EntranceIcon },
];

const PlacesFormPage = () => {
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [photoLink, setPhotoLink] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setShowLoader(true);
        const body = {
          owner: user.userId,
          title: values.title.trim(),
          address: values.address.trim(),
          photos: values.photos,
          description: values.description.trim(),
          perks: values.perks,
          extraInfo: values.extraInfo,
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          maxGuests: Number(values.maxGuests),
          price: Number(values.price),
        };
        const resp = id
          ? await updatePlace({ ...body, id: id })
          : await addPlace(body);
        toast.success(resp?.data?.message);
        navigate("/account/places");
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again.",
        );
      } finally {
        setShowLoader(false);
      }
    },
  });

  const showError = (name) => formik.touched[name] && formik.errors[name];
  const errorClass = "text-red-500 text-sm ml-1 mb-2";

  const addImageByLink = async (e) => {
    e.preventDefault();
    if (!photoLink.trim()) {
      toast.error("Enter an image link first");
      return;
    }
    try {
      setShowLoader(true);
      const resp = await uploadImageByLink(photoLink.trim());
      formik.setFieldValue("photos", [
        ...formik.values.photos,
        resp.data.data.url,
      ]);
      toast.success(resp?.data?.message);
      setPhotoLink("");
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

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setShowLoader(true);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      const resp = await uploadImage(data);
      formik.setFieldValue("photos", [
        ...formik.values.photos,
        ...resp.data.data,
      ]);
      toast.success(resp?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setShowLoader(false);
      e.target.value = "";
    }
  };

  const handlePerksChange = (e) => {
    const { checked, name } = e.target;
    const next = checked
      ? [...formik.values.perks, name]
      : formik.values.perks.filter((item) => item !== name);
    formik.setFieldValue("perks", next);
  };

  const removePhoto = (ev, image) => {
    ev.preventDefault();
    formik.setFieldValue(
      "photos",
      formik.values.photos.filter((photo) => photo !== image),
    );
  };

  const setAsMain = (ev, image) => {
    ev.preventDefault();
    formik.setFieldValue("photos", [
      image,
      ...formik.values.photos.filter((photo) => photo !== image),
    ]);
  };

  useEffect(() => {
    if (!id) return;
    const GetPlace = async () => {
      try {
        setShowLoader(true);
        const resp = await getPlace(id);
        const p = resp.data.data;
        setInitialValues({
          title: p.title || "",
          address: p.address || "",
          photos: p.photos || [],
          description: p.description || "",
          perks: p.perks || [],
          extraInfo: p.extraInfo || "",
          checkIn: p.checkIn || "",
          checkOut: p.checkOut || "",
          maxGuests: p.maxGuests ?? "",
          price: p.price ?? "",
        });
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
  }, [id]);

  return (
    <div>
      <AccountNav />
      <form onSubmit={formik.handleSubmit} noValidate>
        <div>
          <h2 className="text-2xl mt-4 font-semibold">Title</h2>
          <p className="text-gray-500 text-sm">
            Title for your place, should be short and catchy as in advertisement
          </p>
          <input
            type="text"
            placeholder="title, for example: My lovely apt"
            {...formik.getFieldProps("title")}
          />
          {showError("title") && (
            <p className={errorClass}>{formik.errors.title}</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-semibold">Address</h2>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <input
            type="text"
            placeholder="address"
            {...formik.getFieldProps("address")}
          />
          {showError("address") && (
            <p className={errorClass}>{formik.errors.address}</p>
          )}
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
                type="button"
                className="rounded-2xl font-semibold  w-[20%]"
                onClick={addImageByLink}
              >
                Add photo
              </button>
            </div>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {formik.values.photos.map((image, index) => {
              return (
                <div className="h-32 flex relative" key={image + index}>
                  <img
                    src={image}
                    alt="place"
                    className="rounded-2xl object-cover w-full"
                  />
                  <button
                    type="button"
                    onClick={(ev) => removePhoto(ev, image)}
                    className="absolute bottom-1 right-1 text-white rounded-xl p-1 bg-black bg-opacity-70"
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    type="button"
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
          {formik.submitCount > 0 && formik.errors.photos && (
            <p className={`${errorClass} mt-2`}>{formik.errors.photos}</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-semibold">Description</h2>
          <p className="text-gray-500 text-sm">Description of this place</p>
          <textarea {...formik.getFieldProps("description")} />
          {showError("description") && (
            <p className={errorClass}>{formik.errors.description}</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-semibold">Perks</h2>
          <p className="text-gray-500 text-sm">Select all the perks</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            {PERKS.map(({ name, label, Icon }) => (
              <label
                key={name}
                className="border p-4 flex gap-2 rounded-2xl items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={name}
                  checked={formik.values.perks.includes(name)}
                  onChange={handlePerksChange}
                />
                <Icon />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-semibold">Extra Info</h2>
          <p className="text-gray-500 text-sm">House rules, etc</p>
          <textarea {...formik.getFieldProps("extraInfo")} />
          {showError("extraInfo") && (
            <p className={errorClass}>{formik.errors.extraInfo}</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-semibold">
            Check in&out times, max guest
          </h2>
          <p className="text-gray-500 text-sm">
            Add check in out times, remember to have some time window for
            cleaning the room between guests
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1 font-semibold">Check in time</h3>
              <input type="time" {...formik.getFieldProps("checkIn")} />
              {showError("checkIn") && (
                <p className={errorClass}>{formik.errors.checkIn}</p>
              )}
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-semibold">Check out time</h3>
              <input type="time" {...formik.getFieldProps("checkOut")} />
              {showError("checkOut") && (
                <p className={errorClass}>{formik.errors.checkOut}</p>
              )}
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-semibold">Max number of guest</h3>
              <input
                type="number"
                min={1}
                {...formik.getFieldProps("maxGuests")}
              />
              {showError("maxGuests") && (
                <p className={errorClass}>{formik.errors.maxGuests}</p>
              )}
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-semibold">Price</h3>
              <input type="number" min={1} {...formik.getFieldProps("price")} />
              {showError("price") && (
                <p className={errorClass}>{formik.errors.price}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="primary font-semibold my-4"
          disabled={showLoader}
        >
          Save
        </button>
      </form>
      {showLoader && <Loader />}
    </div>
  );
};

export default PlacesFormPage;
