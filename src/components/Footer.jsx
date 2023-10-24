import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className='bg-neutral-50 border border-gray-300 px-4 md:px-20'>
      <div className=" py-6 md:py-12 -mx-3 flex flex-col md:flex-row justify-between">
        <section className=" px-3 w-full md:w-1/4 mb-8 md:mb-0">
          <div className="mb-6 ">
            <h3 className='font-medium text-md'>Support</h3>
          </div>
          <ul>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Help Center</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Get help with a safety issue</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Supporting people with disabilities</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Cancellation options</a>
            </li>
          </ul>
        </section>
        <section className="px-3 w-full md:w-1/4 mb-8 md:mb-0">
          <div className="mb-6">
            <h3 className='font-medium text-md'>Community</h3>
          </div>
          <ul>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Poshbo.org:disaster relief housing</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Combating discrimination</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Supporting people with disabilities</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Cancellation options</a>
            </li>
          </ul>
        </section>
        <section className="px-3 w-full md:w-1/4 mb-8 md:mb-0">
          <div className="mb-6">
            <h3 className='font-medium text-md'>Hosting</h3>
          </div>
          <ul>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">List your Property</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Explore resources</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Visit community forum</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">How to host responsibly</a>
            </li>
          </ul>
        </section>
        <section className="px-3 w-full md:w-1/4 mb-8 md:mb-0">
          <div className="mb-6">
            <h3 className='font-medium text-md'>Poshbo</h3>
          </div>
          <ul>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Newsroom</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Learn about new features</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Letter from our founders</a>
            </li>
            <li className='mt-4'>
              <a href="#" className="text-sm font-light">Careers</a>
            </li>
          </ul>
        </section>
      </div>
      <hr className='border-gray-300'/>
      <div className="py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-800 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} POSHBO, Inc. &middot;Privacy &nbsp;&middot;Terms &nbsp;&middot;Sitemap  
          &nbsp;&middot;Company details
        </div>
        <div className="text-sm text-gray-800 font-medium flex justify-between items-center">
          <div className="mx-5 mb-2 md:mb-0">
            <LanguageIcon sx={{fontSize:'20px',marginRight:'5px'}}/>
            English (IN)
          </div>
          <div className="flex space-x-2">
            <FacebookIcon sx={{fontSize:'20px'}}/>
            <TwitterIcon sx={{fontSize:'20px'}}/>
            <InstagramIcon sx={{fontSize:'20px'}}/>
          </div>
        </div>
      </div>      
    </footer>
  )
}

export default Footer
