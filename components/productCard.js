const ProductCard = ({item, handleItemCart, mode, number, removeItemFromCart}) => {
    console.log(item);
    let duration = "Length: ";
    let creatorName;
    switch (item.item_type) {
        case 'Movie':
            creatorName = "Director: ";
            break;
        case 'Music':
            creatorName = "Artist: ";
            break;
        default:
            creatorName = "Author: ";
            duration = "Pages: "
    }
    const removeItemFromCartWrapper = () => removeItemFromCart(item.id);
    return (
        <div>
            <div className="sm:mx-32 mx-3 py-5">
                <br/>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden sm:flex">
                    <img className="sm:w-1/3 h-auto object-cover" src="/speed-dark.jpg"
                         alt="Your fabulous dish"/>
                    <div className="w-full">
                        <div className="px-4 sm:px-24 pt-6 pb-4 mb-4">
                            <div className="mb-4">
                                <h1 className="text-gray-700 font-bold text-3xl">{item.title}</h1>
                            </div>
                            <div className="mb-4 flex">
                                <p className="text-gray-700 text-xl">
                                    <span className="text-gray-800 font-semibold">Type: </span>
                                    {/*{item.item_type}*/}
                                </p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="text-gray-700 text-xl">
                                    <span className="text-gray-800 font-semibold">{duration} </span>
                                    {item.item_length}
                                </p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="text-gray-700 text-xl">
                                    <span className="text-gray-800 font-semibold">Year of released: </span>
                                    {item.year_released}
                                </p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="text-gray-700 text-xl">
                                    <span className="text-gray-800 font-semibold">{creatorName} </span>
                                    {item.creator}
                                </p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="text-gray-700 text-xl">
                                    <span className="text-gray-800 font-semibold">genre: </span>
                                    {item.genre}
                                </p>
                            </div>
                            {number
                                ? <div className="mb-4 flex">
                                    <p className="text-gray-700 text-xl">
                                        <span className="text-gray-800 font-semibold">You have {number} of this item in your cart</span>
                                    </p>
                                </div>
                                :<></>
                            }
                        </div>
                    </div>
                    <div className="px-4 sm:pt-6 sm:pb-4 mb-4 sm:mr-20 w-full">
                        <div className="sm:mt-16">
                            <span className="sm:text-6xl text-gray-900 text-4xl">${item.price}</span>
                        </div>
                        {mode === "cart"
                            ? <button
                                className="sm:float-right block mx-auto sm: mt-20 py-2 px-2 font-semibold uppercase
                                    text-lg text-red-600 rounded hover:bg-red-600 hover:text-gray-100"
                                type="button"
                                onClick={() => removeItemFromCartWrapper()}
                            >
                                Remove from cart
                            </button>
                            : <button
                                className="sm:float-right block mx-auto sm: mt-20 py-2 px-2 font-semibold uppercase
                                    text-lg text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100"
                                type="button"
                                onClick={() => handleItemCart()}
                            >
                                Add to cart
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
