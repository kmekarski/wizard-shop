import React from "react";

export default function AdCard(props) {
    return (
        <div className='ad card--big'>
            <div className="ad__inner">
              <div>
                <h2 className='text--primary'>Free delivery</h2>
                <h2 className='text--medium-bold'>On all items</h2>
              </div>
              <div>
                <h2 className='text--primary text--special'>Shop Now</h2>
              </div>
            </div>
          </div>
    )
}