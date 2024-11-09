import React, { useEffect ,useState} from 'react';

const RandomUser = () => {
  const [users,setUsers] = useState([]);
  const [button,setButton] = useState(true);

  useEffect(()=>{
    getUsers({setUsers});
  },[button]);

let items = [];
if(users.length>0){
   items = users.map((ele,idx)=>{
    console.log(ele);
    return <span key={idx}>
      <SingleUserComponent imageUrl={ele.picture.medium} name={ele.name.first} />
    </span>
  });
}

  return( <div>
    <div className="flex flex-wrap gap-4 border">{items}</div>
    <button onClick={() => setButton(!button)}>Add More Users..</button>
  </div>)

};

async function getUsers({setUsers}){
  let tmpdata=[];
  for(let i=0;i<10;i++){
    const res = await fetch("https://randomuser.me/api?page=1");
    const user = await res.json();
    tmpdata.push(user.results[0]);
  }
  
  setUsers((prev)=>[...prev,...tmpdata]);
}




function SingleUserComponent({imageUrl,name}){
  return (
    <span className="border-solid border-2 p-5 gap-y-2 w-[200px] grid place-items-center h-[200px] rounded-xl">
      <div>
        <img
          src={imageUrl}
          alt="Random User"
          className="rounded-full h-20"
        />
      </div>
      <div className="font-bold text-xl">{name}</div>
    </span>
  );
}

export default RandomUser;
