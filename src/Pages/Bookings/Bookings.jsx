import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import BookingRow from "./BookingRow";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])

    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [url])

    const handleDelete = id => {
        const proceed = confirm('are you sure you want to delete?')
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast("Deleted successfully");
                        const remaining = bookings.filter(b => b._id !== id)
                        setBookings(remaining);
                    }
                })
        }
    }

    const handleBookConfirm = id => {
       fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'confirm'})
        
       })
       .then(res => res.json())
       .then(data => {
        console.log(data);
        if(data.modifiedCount > 0) {
            // kisu akta hbe
            const remaining = bookings.filter(booking => booking._id !== id);
            const updated = bookings.find(booking => booking._id === id);
            updated.status = 'confirm';
            const newBookings = [updated, ...remaining];
            setBookings(newBookings);
        }
       })
    }
    return (
        <div>
            <h2 className="text-4xl text-center">You have {bookings.length} bookings</h2>
            <div className="overflow-x-auto w-full mt-5">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Service</th>
                            <th>Service Name</th>
                            <th>Service Date</th>
                            <th>Service price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookConfirm={handleBookConfirm}
                            ></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Bookings;