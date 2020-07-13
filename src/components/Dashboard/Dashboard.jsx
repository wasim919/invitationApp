import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../components';
import { fetchLoggedUser, fetchPosts } from '../../api';
import { Posts, Connections } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Oswald, sans-serif',
    backgroundColor: theme.palette.background.paper,
    width: 90 + '%',
    marginLeft: 0 + 'px',
  },
}));

export default function Dashboard() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { _id, username, email, followers, following },
        } = await fetchLoggedUser();
        const data = { _id, username, email, followers, following };
        setUserData(data);
        console.log('im here');
        dispatch({
          type: 'SET_USER_DETAILS',
          payload: {
            ...data,
          },
        });
        const fetchedData = await fetchPosts(data._id);
        dispatch({
          type: 'SET_USER_POSTS',
          payload: {
            posts: fetchedData.data,
          },
        });
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <div className='container'>
      <h2>Hi {userData.username}, Welcome to the dashboard</h2>
      <Logout />
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
          >
            <Tab label='Posts' />
            <Tab label='Feed' />
            <Tab label='Followers' />
            <Tab label='Following' />
            <Tab label='+' />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Posts />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h3>Hi</h3>
          {/* <Feed isFollower={true} /> */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Connections isFollower={true} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Connections isFollower={false} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <h3>Hi</h3>
          {/* <CreatePost isFollower={false} /> */}
        </TabPanel>
      </div>
      {/* <ul className='nav nav-tabs' id='myTab' role>
        <li className='nav-item'>
          <a
            href='#posts'
            className='nav-link active'
            id='posts-tab'
            data-toggle='tab'
            role='tab'
            aria-controls='posts'
            aria-selected='true'
          >
            Posts
          </a>
        </li>
        <li className='nav-item'>
          <a
            className='nav-link'
            id='followers-tab'
            data-toggle='tab'
            href='#followers'
            role='tab'
            aria-controls='followers'
            aria-selected='false'
          >
            Followers
          </a>
        </li>
        <li className='nav-item'>
          <a
            href='#following'
            className='nav-link'
            id='following-tab'
            data-toggle='tab'
            href='#following'
            role='tab'
            aria-controls='following'
            aria-selected='false'
          >
            Following
          </a>
        </li>
      </ul>
      <div class='tab-content' id='myTabContent'>
        <div
          class='tab-pane fade show active'
          id='posts'
          role='tabpanel'
          aria-labelledby='posts-tab'
        >
          <Posts />
        </div>
        <div
          class='tab-pane fade'
          id='followers'
          role='tabpanel'
          aria-labelledby='followers-tab'
        >
          <Connections follower={true} />
        </div>
        <div
          class='tab-pane fade'
          id='following'
          role='tabpanel'
          aria-labelledby='following-tab'
        >
          <Connections follower={false} />
        </div>
      </div> */}
    </div>
  );
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function SimpleTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (

//   );
// }
