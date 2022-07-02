import React, {Component} from "react";
import {Route, Navigate} from "react-router-dom";

function ProtectedRoute ({component: Component, ...props}) {
  return (
    <Route>
      {() => props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-up" />}
    </Route>
  );
}

export default ProtectedRoute;


// const ProtectedRoute = (props) => {
//   // If authorized, return an outlet that will render child elements
//   // If not, return element that will navigate to login page
//   return props.loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
// };
//
// <Route exact path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
//   <Route
//     exact
//     path="/"
//     element={
//       <Main
//         onEditProfile={handleEditProfileClick}
//         onAddPlace={handleAddPlaceClick}
//         onEditAvatar={handleEditAvatarClick}
//         onCardClick={handleCardClick}
//         onCardLike={handleCardLike}
//         onCardDelete={handleCardDelete}
//         cards={cards}
//       />
//     }
//   />
// </Route>