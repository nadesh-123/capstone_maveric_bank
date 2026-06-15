import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
export default function AccountTypeCard({ title, imageUrl }) {
    const navigate=useNavigate()
  return (
    <>
      <style>{`
       
      `}</style>

      <div className="account-card">
        <div className="card-image-wrapper">
          <img 
            src={imageUrl} 
            alt={title} 
            className="card-image"
          />
        </div>
        <div className="card-content-bottom">
          <h2 className="card-title">{title}</h2>
          <div className="arrow-circle">
            <ArrowRight onClick={()=>navigate(`/createAccount/${title}`)}size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </>
  );
}