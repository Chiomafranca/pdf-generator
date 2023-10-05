import React, { useState } from 'react'
import jsPDF from 'jspdf';

const Form = () => {
   const [formData, setFormData] =useState({
      name:"",
      email:"",
      unitprice1:"",
      unitprice2:"",
      Amount:""
   })

   const handleInputChange =(e)=>{
    e.preventDefault()

       const {name, value} = e.target;
       setFormData(prevData =>({
          ...prevData,
          [name]: value
       }))
   }

   const generatePDF =() =>{
       const {name, email, unitprice1,  unitprice2, Amount}=formData

       if(!name || !email || !unitprice1 || !unitprice2|| !Amount 
       ) {
           alert("Please fill in all required fields before generating the PDF.")
           return
       } 

       const doc = new jsPDF();
       doc.text('GN-Frontend Invoice', 10, 10);

       const totalAmount =
       parseFloat(unitprice1)+
       parseFloat(unitprice2)+
       parseFloat(Amount)

       const content =`
        Name: ${name}
        Email: ${email}
        UnitPrice1: ${unitprice1}
        UnitPrice2: ${unitprice2}
        SalesAmount: ${Amount}
        Total Amount :${totalAmount.toFixed(2)}
       `
   
         doc.text(content, 10, 30)
         doc.save('invoice pd')

         setFormData({
            name:"",
            email:"",
            unitprice1:"",
            unitprice2:"",
            Amount:""
         })
   }

   const totalAmount =
     parseFloat(formData.Amount)+
     parseFloat(formData.unitprice1)+
     parseFloat(formData.unitprice2)

  return (
       <div className=' bg-gray-900 text-white mt-5 rounded-sm mx-auto p-5 max-w-[800px]'>
     
          <div>
            <p>Name</p>
            <input type="text"
               className='border outline-none py-1  mb-5 border-black w-[67%] placeholder:text-center rounded-sm text-blue-900'
               placeholder='Type your name...'
               value={formData.name}
               onChange={handleInputChange}
               name="name"
             />
          </div>

         <div>
           <p>Email</p>
           <input type="email" 
              className='border outline-none py-1 mb-5 border-black  w-[67%] placeholder:text-center rounded-sm text-blue-900'
              placeholder='Type your email' 
              value={formData.email}
              onChange={handleInputChange}
              name="email"
            />
         </div>

       
         <div>
           <p>unitprice1</p>
           <input type="number"
              className='border outline-none py-1 mb-5 border-black  w-[67%] placeholder:text-center rounded-sm text-blue-900'
              placeholder='type your price'
              value={formData.unitprice1}
              onChange={handleInputChange}
              name="unitprice1"
            />
         </div>

         <div>
           <p>unitprice2</p>
           <input type="number" 
             className='border outline-none py-1 mb-5 border-black  w-[67%] placeholder:text-center rounded-sm text-blue-900'
             placeholder='enter your price'
             value={formData.unitprice2}
             onChange={handleInputChange}
             name="unitprice2"
            />
         </div>
          
         <div>
           <p>Sales Amount</p>
           <input type="number" 
             className='border outline-none py-1 mb-5  border-black w-[67%] placeholder:text-center rounded-sm text-blue-900'
             placeholder='enter your amount'
             value={formData.Amount}
             onChange={handleInputChange}
             name="Amount"
            />
         </div>

           <div className='flex justify-center space-x-2'>
              <label>Total Amount:</label>
              <h4>value={`$${totalAmount.toFixed(2)}`}</h4>
           </div>

          <button onClick={generatePDF} className='bg-green-500 py-1 px-7 rounded-full mt-3'>generatePDF</button>
    </div>
  )
}

export default Form
