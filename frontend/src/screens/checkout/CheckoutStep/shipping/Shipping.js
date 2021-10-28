import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../../Redux/actions/cartActions";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../CheckoutStep";
import {useHistory} from 'react-router-dom'
import { notifyError } from "../../../../utils/alerts/Alerts";
import { ToastContainer } from "react-toastify";
import MetaData from "../../../../utils/title/MetaData";

const Shipping = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            notifyError("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        history.push("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title='shipping info'/>
            <CheckoutSteps activeStep={0} />
            <div className="allTypeFormPage">
                <div className="mainFormContainer">
                    <div className="form__header">
                        <h2>Shipping Details</h2>
                      </div>
                    <form
                        className="formClass"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div className="form__control ship">
                            <HomeIcon />
                            <textarea
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form__control ship">
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="form__control ship">
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div className="form__control ship">
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div className="form__control ship">
                            <PublicIcon />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div className="form__control ship">
                                <TransferWithinAStationIcon />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="btnPrimary"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </Fragment>
    );
};

export default Shipping;
