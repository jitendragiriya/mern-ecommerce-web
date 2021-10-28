import React, { useState, useEffect, Fragment } from 'react'
import './NewProductAdd.css'
import { useHistory } from 'react-router-dom'
import SidebarMenu from './Dashboard/components/SidebarMenu';
import { updateProduct, getProductDetails, clearError } from "../../Redux/actions/productAction";
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_PRODUCT_DETAILS_RESET } from '../../Redux/constants/productConstants'
import Loading from '../../components/loaders/Loading'
import MetaData from '../../utils/title/MetaData';
import { notifyError, notifySuccess } from '../../utils/alerts/Alerts';
import { ToastContainer } from 'react-toastify';

const UpdateProduct = ({ match }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [oldImages, setOldImages] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const { error, product, loading } = useSelector((state) => state.productDetails);
    const { isUpdated, loading: updating, error: updateError } = useSelector((state) => state.updateProduct);


    const [inputs, setInputs] = useState({ name: '', price: 0, description: '', category: '', Stock: 0 });

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const { name, price, description, category, Stock } = inputs

    const createProductSubmitHandler = (e) => {
        e.preventDefault(); e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };


    const productId = match.params.id
    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        }
        else {
            setInputs({ name: product.name, price: product.price, description: product.description, category: product.category, Stock: product.Stock })
            setOldImages(product.images)
        }

        if (error) {
            dispatch(clearError());
        }
        if (isUpdated) {
            notifySuccess("Product Updated Successfully");
            dispatch({ type: UPDATE_PRODUCT_DETAILS_RESET });
            history.push('/admin/products')
        }

        if (updateError) {
            notifyError(updateError);
            dispatch(clearError());
        }


    }, [dispatch, history, isUpdated, product, productId, error, updateError])


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
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


    return (
        <Fragment>
            {
                loading || updating ?
                    (<Loading />) :
                    (<Fragment>
                        <MetaData title='Update Product' />
                        <div className='adminDashboard'>
                            <SidebarMenu />
                            <div className='allTypeFormPage'>
                                <div className='mainFormContainer addNewProduct'>
                                    <div className="form__header">
                                        <h2>Update Product</h2>
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
                                            ></textarea>
                                        </div>
                                        <div className='form__control newp'>
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                required
                                                value={inputs.price}
                                                onChange={onChange}
                                                name='price'
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
                                            ></textarea>
                                        </div>

                                        <div className='form__control newp'>
                                            <select onChange={onChange} name='category' value={inputs.category}>
                                                <option >Choose Category</option>
                                                {categories.map((cate) => (
                                                    <option key={cate} value={cate}>
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
                                                value={inputs.Stock}
                                                onChange={onChange}
                                                name='Stock'
                                            />
                                        </div>

                                        <div id="createProductFormFile" className='form__control newp'>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={updateProductImagesChange}
                                                multiple
                                            />
                                        </div>

                                        <div id="createProductFormImage" className='form__control newp'>
                                            {oldImages &&
                                                oldImages.map((image, index) => (
                                                    <img key={index} src={image.url} alt="img" />
                                                ))}
                                        </div>
                                        <div id="createProductFormImage" className='form__control newp'>
                                            {imagesPreview.map((image, index) => (
                                                <img key={index} src={image} alt="img" />
                                            ))}
                                        </div>
                                        <button
                                            className='btnPrimary btnUpdate'
                                            type="submit"

                                        >
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment >)
            }
            <ToastContainer/>
        </Fragment>
    )
}

export default UpdateProduct
