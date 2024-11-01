import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, doctors } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  // console.log(dayOfWeek);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const getAvailableSlots = async () => {

    setDocSlots([]);

    //Gettig current date.
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //Current date with index.
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // set end time of the date with index.
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0, 0, 0);

      //Setting Hours
       if(today.getDate() === currentDate.getDate()){ 
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1: 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
       }else{
         currentDate.setHours(10);
         currentDate.setMinutes(0);
       }
         
       let timeSlots = [];
       while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'} )

         // add slots to the array.
         timeSlots.push({
          datetime:new Date(currentDate),
          time: formattedTime
         });

         // Incrementing date by 30 minutes.
         currentDate.setMinutes(currentDate.getMinutes() + 30);
       }

       setDocSlots((prev) => ([...prev,timeSlots]));
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // useEffect(() => {
  //   console.log(docSlots);
  // },[docSlots])
  
  return (
    docInfo && (
      <div>
        {/**---------------------- Doctor Details ---------------------- */}
        <div className="flex flex-col md:flex-row gap-4 ">
          <div>
            <img
              className="w-full sm:max-w-72 bg-primary rounded-lg "
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/**---------------------- DoctorInfo : name ,degree, experience ---------------------- */}
          <div className="flex-1 border border-gray-300 p-8 py-7 rounded-lg bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="verified_icon"
              />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="px-2 py-0.5 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/**---------------------- Doctor About ---------------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4  ">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/**---------------------- Booking  Slots ---------------------- */}
        <div className=" sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              docSlots.length && docSlots.map((item, index) => (
                <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"} `} key={index}>
                  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
              
            }
          </div>
          
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length && docSlots[slotIndex].map((item, index)=>(
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light px-2 py-2 flex-shrink-0 rounded-full cursor-pointer ${slotTime === item.time ? "bg-primary text-white" : "border border-gray-300"}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
        </div>
        
       {/**---------------------- Listing Related Doctors  ---------------------- */} 
       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
