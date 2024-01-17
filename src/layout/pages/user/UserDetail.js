export default function UserDetail() {
    let currentUser;
    if (localStorage.getItem('currentUser') !== null) {
        const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(loggedUser.firstname);
        currentUser = loggedUser;
    };


    return (
        <div>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th className="col-3" scope="row">User Name</th>
                        <td className="col-8">{currentUser.id}</td>
                        <td className="col-1"></td>
                    </tr>
                    <tr>
                        <th scope="row">First Name</th>
                        <td>{currentUser.firstname}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Last Name</th>
                        <td>{currentUser.lastname}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{currentUser.email}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Phone</th>
                        <td>{currentUser.phone}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Shop Name</th>
                        <td>{currentUser.shopName}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Shop Status</th>
                        <td>{currentUser.isShopActive ? "Active" : "Inactive"}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Shop Avatar</th>
                        <td>{currentUser.shopImg}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                    <tr>
                        <th scope="row">Role</th>
                        <td>{currentUser.role}</td>
                        <td className="col-1"><button className="btn btn-primary">Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}