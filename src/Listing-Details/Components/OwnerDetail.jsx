import { Button } from '@/Components/ui/button'
import Service from '@/Shared/Service'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OwnerDetail = ({carDetail}) => {

  const {user} = useUser()
  const navigation = useNavigate();

  const onMessageOwnerButtonClick = async ()=>{
          const userId = user.primaryEmailAddress.emailAddress.split('@')[0];
          const ownerUserId = carDetail?.createdBy.split('@')[0]

    try{
    await Service.CreateSendBirdUser(userId, user?.fullName,user?.imageUrl)
    .then(resp=>{
      console.log(resp);
      
    })
    }catch(e){

    }
    try{
      await Service.CreateSendBirdUser(ownerUserId, carDetail?.userName,carDetail?.userIm)
    .then(resp=>{
      console.log(resp);
      })
    }catch(e){}

    try{
      await Service.CreateSendBirdChannel([userId, ownerUserId],carDetail?.listingTitle)
      .then(resp=>{
        console.log(resp);
        console.log("Channel Created");
        navigation('/profile')
      })
    }catch(e){}
  }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-5'>
        <h2 className='font-medium text-2xl mb-3'>Owner / Deals</h2>
      <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
            <h2 className='mt-2 text-gray-500 '>{carDetail?.createdBy}</h2>

            <Button className="w-full mt-6"
            onClick={onMessageOwnerButtonClick}
            >Message Owner</Button>

    </div>
  )
}

export default OwnerDetail
