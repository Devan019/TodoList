"use client"
import React, { useState } from 'react';

const Page = () => {
  const [titel, settitel] = useState("")
  const [desc, setdesc] = useState("");
  const [item, setitem] = useState(1);
  const [svalue, setsvalue] = useState("");
  const [allTask, setallTask] = useState([]);

  const search = () => {

    let allItem = document.querySelectorAll("#item");
    let allTitel = document.querySelectorAll("#stitel");
    let allDesc = document.querySelectorAll("#sdesc");
    let allDelet = document.querySelectorAll("#delete");
    let allCom = document.querySelectorAll("#com")

    let sp = document.querySelector(".sp")

    // console.log(allItem ,allDesc , allTitel)
    let count = 0;
    for (let i = 0; i < allDesc.length; i++) {

      if (!allItem[i].innerText.includes(svalue) && !allTitel[i].innerText.includes(svalue) && !allDesc[i].innerText.includes(svalue)) {
        allDesc[i].classList.add("display");
        allItem[i].classList.add("display");
        allTitel[i].classList.add("display");
        allDelet[i].classList.add("display");
        allCom[i].classList.add("display");
      } else {
        count++;
        allDesc[i].classList.remove("display");
        allItem[i].classList.remove("display");
        allTitel[i].classList.remove("display");
        allDelet[i].classList.remove("display");
        allCom[i].classList.remove("display");

      }
    }

    if (count == 0) {
      sp.classList.remove("display");
    } else {
      sp.classList.add("display");
    }

  };

  const complete = (index) => {
    let conform = confirm("Conform to completed your task?")
    if (conform) {
      let allComBtns = document.querySelectorAll("#com")
      let allTicks = document.querySelectorAll("#tickSvg")

      allComBtns[index].disabled = true;
      allComBtns[index].innerText = "Completed"
      allComBtns[index].classList.add("completed");
      allComBtns[index].classList.remove("hover:bg-green-300");

      allTicks[index].classList.remove("display")
    }

  }
  const Atask = (ele, index) => {
    return (
      <div className='flex items-center justify-between mb-2' key={index}>

        <div className='flex items-center justify-center gap-1'>
          <svg width='20' className='display' id='tickSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>
          <h2 id='item'>{ele.item}</h2>
        </div>
        <h2 id='stitel'>{ele.titel}</h2>
        <h3 id='sdesc'>{ele.desc}</h3>
        <div className='flex justify-center gap-2'>

          <button
            className='p-1.5 rounded-md bg-green-400 hover:bg-green-300'
            id='com'
            onClick={() => {
              complete(index)
            }}
          >
            Complete
          </button>

          <button
            id='delete'
            className='p-1.5 rounded-md bg-red-500 hover:bg-red-400'
            onClick={() => {
              deleteTask(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const newS = (index) => {
    return (
      <>
        <label htmlFor='search' className='m-2'>Search</label>
        <input
          key={index}
          className='text-black p-2 text-lg rounded-md w-1/5'
          type='text'
          id='search'
          value={svalue}
          onChange={(e) => {
            setsvalue(e.target.value);
          }}
          onKeyUp={() => {
            search()
          }}
        />
      </>
    );
  };

  const submit = (ele) => {
    ele.preventDefault();
    console.log(desc, titel);

    setitem(item + 1);
    setallTask([...allTask, { titel, desc, item }]);

    setdesc("");
    settitel("");
  };

  const deleteTask = (i) => {
    let r = confirm("Confirm to delete");
    if (r) {
      let copy = [...allTask];
      copy.splice(i, 1);
      setallTask(copy);
    }
  };

  return (
    <>
      <form className='flex flex-col justify-center items-center gap-10' onSubmit={submit}>
        <div>
          <label className='text-2xl' id='titel'>Titel :- </label>
          <input
            required
            className='text-black p-2 rounded-md'
            placeholder='Enter Titel'
            type='text'
            id='title'
            value={titel}
            onChange={(e) => {
              settitel(e.target.value);
            }}
          />
        </div>

        <div>
          <label className='text-2xl' id='desc'>Desc :- </label>
          <input
            required
            className='text-black p-2 rounded-md'
            placeholder='Enter description'
            type='text'
            id='desc'
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />
        </div>

        <button className='bg-gray-100 text-black p-1 rounded-sm'>Add Note</button>
      </form>

      <div className='bg-yellow-300 p-10 my-10 text-black text-2xl' id='task'>

        {allTask.length > 0 ? (
          <>
            {newS(0)}
            {allTask.map((ele, index) => Atask(ele, index))}
          </>
        ) : (
          <h2>No task Available</h2>
        )}

        <h2 className='display sp'>No task Available</h2>
      </div>
    </>
  );
};

export default Page;
