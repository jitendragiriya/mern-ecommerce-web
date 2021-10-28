import React, { useState, useEffect, Fragment } from 'react'
import './NewProductAdd.css'
import SidebarMenu from './Dashboard/components/SidebarMenu';
import { clearError, newProductCreate } from "../../Redux/actions/productAction";
import { useSelector, useDispatch } from 'react-redux'
import { NEW_PRODUCT_RESET } from '../../Redux/constants/productConstants'
import Loading from '../../components/loaders/Loading'
import { notifySuccess } from '../../utils/alerts/Alerts';
import { ToastContainer } from 'react-toastify';
import MetaData from '../../utils/title/MetaData';

const NewProductAdd = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [inputs, setInputs] = useState({ name: '', price: 0, sellPrice: 0, description: '', category: '', Stock: 0 });

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const { name, price, sellPrice, description, category, Stock } = inputs

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("sellPrice", sellPrice);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(newProductCreate(myForm));
    };
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (success) {
            notifySuccess('One new product added successfully.')
            dispatch({ type: NEW_PRODUCT_RESET });
        }
        if (error) {
            dispatch(clearError())
        }
    }, [dispatch, success, error])

    return (
        <Fragment>
            {loading ?
                (<Loading />) :
                (<Fragment>
                    <MetaData title='Add New Product' />
                    <div className='adminDashboard'>
                        <SidebarMenu />
                        <div className="allTypeFormPage">
                            <div className='mainFormContainer addNewProduct'>
                                <div className="form__header">
                                    <h2>Create Product</h2>
                                </div>
                                <form
                                    className="formClass"
                                    encType="multipart/form-data"
                                    onSubmit={createProductSubmitHandler}
                                >

                                    <div className='form__control newp'>
                                        <textarea
                                            placeholder="Product Name"
                                            value={inputs.name}
                                            onChange={onChange}
                                            cols="30"
                                            rows="1"
                                            name='name'
                                            minLength='3'
                                        ></textarea>
                                    </div>
                                    <div className='form__control newp'>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            required
                                            onChange={onChange}
                                            name='price'
                                            min='1'
                                        />
                                    </div>
                                    <div className='form__control newp'>
                                        <input
                                            type="number"
                                            placeholder="sell price"
                                            required
                                            onChange={onChange}
                                            name='sellPrice'
                                            min='1'
                                        />
                                    </div>
                                    <div className='form__control newp'>
                                        <textarea
                                            placeholder="Product Description"
                                            value={inputs.description}
                                            onChange={onChange}
                                            cols="30"
                                            rows="1"
                                            name='description'
                                            maxLength='200'
                                        ></textarea>
                                    </div>

                                    <div className='form__control newp'>
                                        <select onChange={onChange} name='category' value={inputs.category} >
                                            <option>Choose Category</option>
                                            {categories.map((cate) => (
                                                <option key={cate} value={cate}
                                                >
                                                    {cate}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className='form__control newp'>
                                        <input
                                            type="number"
                                            placeholder="Stock"
                                            required
                                            onChange={onChange}
                                            name='Stock'
                                            min='1'
                                        />
                                    </div>

                                    <div id="createProductFormFile" className='form__control newp'>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={createProductImagesChange}
                                            multiple
                                        />
                                        {<p className='validateError img primg'>{'*image should be < 100kb'}</p>}
                                    </div>

                                    <div id="createProductFormImage" className='form__control newp'>
                                        {imagesPreview.map((image, index) => (
                                            <img key={index} src={image} alt="Product Preview" />
                                        ))}
                                    </div>
                                    <button
                                        id="createProductBtn"
                                        className='formSubmitBtn'
                                        type="submit"
                                        disabled={loading ? true : false}
                                    >
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
                )
            }
            <ToastContainer />
        </Fragment>
    )
}

export default NewProductAdd
