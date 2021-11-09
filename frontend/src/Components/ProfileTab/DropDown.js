
import React, {useEffect, useState} from "react";
import { Dropdown, Header, Icon } from 'semantic-ui-react'

const options = [
  {
    key: 'novice',
    text: 'Novice',
    value: 'Novice',
    content: 'Novice',
  },
  {
    key: 'amateur',
    text: 'Amateur',
    value: 'Amateur',
    content: 'Amateur',
  },
  {
    key: 'Pro',
    text: 'Pro',
    value: 'Pro',
    content: 'Pro',
  },
] 


const DropdownExampleInlineTwo = () => {
  const userToken = localStorage.getItem('userToken')
  const [level, setLevel] = useState('true');

  useEffect(() => {

    const payload = {
        token: userToken
    }

    const myHeaders = new Headers();
    console.log({level})
    myHeaders.append('Authorization', userToken);

    fetch('http://localhost:5000/api/v1/user/getlevel', {
      method: 'put',
      body: JSON.stringify(payload),
      headers: myHeaders
  })
  .then(res => {
      if (res.status == 200){
          res.json().then(body => {
              setLevel(body.data)
              console.log("This is body data " + body.data)
              console.log("This is level value " + level)
          })
      }


  })
    // name.key = level
    
    
  }, []);

  const handleClick = (e, data) => {
    // e.preventDefault();
    
    const pay = {
        level: data.value
    }
    const myHeaders = new Headers();
    myHeaders.append('Authorization', userToken);
    console.log("This is the data.value " + pay.level)
    fetch('http://localhost:5000/api/v1/user/changelevel', {
        method: 'put',
        body: JSON.stringify(pay),
        headers: myHeaders
    })
    .then(res => {
        if (res.status === 200){
            res.json().then(body => {
                setLevel(data.value)
                return
            })
        }
    })
}

return(<Dropdown
  inline
  options={options}
  value={level}
  onChange={handleClick}
/>
);
}

export default DropdownExampleInlineTwo
