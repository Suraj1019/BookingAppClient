import React, { useContext, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../App";
import { bookPlace } from "../Services/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

// Today's date as YYYY-MM-DD in the user's local timezone
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const BookingForm = ({ place }) => {
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const today = getToday();

  const validationSchema = useMemo(() => {
    let guests = Yup.number()
      .typeError("Enter a valid number")
      .integer("Guests must be a whole number")
      .min(1, "At least 1 guest is required")
      .required("Number of guests is required");

    if (place?.maxGuests) {
      guests = guests.max(
        place.maxGuests,
        `Maximum ${place.maxGuests} guests allowed`,
      );
    }

    return Yup.object({
      checkIn: Yup.string()
        .required("Check-in date is required")
        .test(
          "not-in-past",
          "Check-in cannot be before today",
          (value) => !value || value >= today,
        ),
      checkOut: Yup.string()
        .required("Check-out date is required")
        .test(
          "after-check-in",
          "Check-out must be after check-in",
          function (value) {
            const { checkIn } = this.parent;
            if (!value || !checkIn) return true;
            return value > checkIn;
          },
        ),
      guests,
      phone: Yup.string()
        .trim()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
        .required("Phone number is required"),
    });
  }, [place?.maxGuests, today]);

  const formik = useFormik({
    initialValues: { checkIn: "", checkOut: "", guests: 1, phone: "" },
    validationSchema,
    onSubmit: async (values) => {
      if (!user) {
        navigate("/login");
        toast.error("Login to continue");
        return;
      }
      try {
        setShowLoader(true);
        const nights = Math.round(
          (new Date(values.checkOut) - new Date(values.checkIn)) /
            (1000 * 60 * 60 * 24),
        );
        const body = {
          placeId: place._id,
          userId: user.userId,
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          guests: Number(values.guests),
          phone: values.phone.trim(),
          userName: user.name,
          price: place.price * nights,
        };
        const resp = await bookPlace(body);
        toast.success(resp?.data?.message);
        navigate("/account/bookings");
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        );
      } finally {
        setShowLoader(false);
      }
    },
  });

  // Derived value, no state or effect needed
  const days =
    formik.values.checkIn &&
    formik.values.checkOut &&
    formik.values.checkOut > formik.values.checkIn
      ? Math.round(
          (new Date(formik.values.checkOut) - new Date(formik.values.checkIn)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="bg-white px-4 py-3 rounded-xl flex flex-col gap-2"
    >
      <div className="text-center text-2xl font-semibold">
        Price:₹{place?.price}/per night
      </div>

      <div className="border rounded-md border-2">
        <div className="flex justify-between gap-1">
          <div className="border-r-2">
            <div className="p-2">
              <label htmlFor="checkIn" className="text-sm font-semibold">
                Check In
              </label>
              <input
                id="checkIn"
                type="date"
                min={today}
                className="rounded-md px-2 text-sm font-semibold border"
                {...formik.getFieldProps("checkIn")}
              />
            </div>
          </div>
          <div>
            <div className="p-2">
              <label htmlFor="checkOut" className="text-sm font-semibold">
                Check out
              </label>
              <input
                id="checkOut"
                type="date"
                min={formik.values.checkIn || today}
                className="rounded-md px-2 text-sm font-semibold border"
                {...formik.getFieldProps("checkOut")}
              />
            </div>
          </div>
        </div>

        {((formik.touched.checkIn && formik.errors.checkIn) ||
          (formik.touched.checkOut && formik.errors.checkOut)) && (
          <div className="px-2 pb-2">
            {formik.touched.checkIn && formik.errors.checkIn && (
              <p className={errorClass}>{formik.errors.checkIn}</p>
            )}
            {formik.touched.checkOut && formik.errors.checkOut && (
              <p className={errorClass}>{formik.errors.checkOut}</p>
            )}
          </div>
        )}

        <div className="border-t-2">
          <div className="p-2">
            <label htmlFor="guests" className="text-sm font-semibold">
              Number of Guests
              {place?.maxGuests ? ` (max ${place.maxGuests})` : ""}
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              max={place?.maxGuests}
              className="border"
              {...formik.getFieldProps("guests")}
            />
            {formik.touched.guests && formik.errors.guests && (
              <p className={errorClass}>{formik.errors.guests}</p>
            )}
          </div>
        </div>

        <div className="p-2">
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone No.
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={10}
            className="border"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className={errorClass}>{formik.errors.phone}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="primary font-semibold"
        disabled={showLoader}
      >
        Book
        {days > 0 && <span>: ₹{place.price * days}</span>}
      </button>
      {showLoader && <Loader />}
    </form>
  );
};

export default BookingForm;
