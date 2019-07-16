import React, { useContext } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { FiltersContext } from "./FiltersContext";
import { makeStyles } from '@material-ui/core/styles';


// import "../public/stylesheet/style.css";
const useStyles = makeStyles({
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    justifyContent: 'space-around',
    flexFlow: 'row wrap',
    display: 'flex'
  },
});

const UserList = (props) => {
  const [users, 
    // setUsers
  ] = useContext(UsersContext);
  const classes = useStyles();
   const filtered = (!props.filters[0] || props.filters[0] === 'both') ? users : users.filter(user => 
    user._fields[0].properties.gender === props.filters[0])
  const filtered2 = filtered.filter(user =>
  // console.log('here', user._fields[0].properties.age.low))

    user._fields[0].properties.age.low >= props.filters[1][0] && user._fields[0].properties.age.low <= props.filters[1][1])

  return (
    <div className={classes.container}>
     {filtered2.map((user, index) => (
        <User key={index} value={user._fields[0].properties} />
      ))}
    </div>
  );
};

export default UserList;
