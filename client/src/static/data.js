import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund, HiOutlineUserGroup } from 'react-icons/hi';
import { CiMoneyBill, CiSettings } from 'react-icons/ci';
import { FiShoppingBag, FiPackage } from 'react-icons/fi';
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
  AiOutlineSetting,
} from 'react-icons/ai';
import {
  computers,
  phones,
  music,
  watches,
  shirts,
  caps,
  pants,
  shoes,
  gaming,
  others,
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
} from '../assets';
import { GrWorkshop } from 'react-icons/gr';
import { BsHandbag } from 'react-icons/bs';

// Sidebar data for admin and seller dashboards
export const adminSidebarItems = [
  { key: 1, label: 'Dashboard', icon: RxDashboard, route: '/admin/dashboard' },
  {
    key: 2,
    label: 'All Sellers',
    icon: GrWorkshop,
    route: '/admin/dashboard-sellers',
  },
  {
    key: 3,
    label: 'All Users',
    icon: HiOutlineUserGroup,
    route: '/admin/dashboard-users',
  },
  {
    key: 4,
    label: 'All Orders',
    icon: FiShoppingBag,
    route: '/admin/dashboard-orders',
  },
  {
    key: 5,
    label: 'All Products',
    icon: BsHandbag,
    route: '/admin/dashboard-products',
  },
  {
    key: 6,
    label: 'All Events',
    icon: MdOutlineLocalOffer,
    route: '/admin/dashboard-events',
  },
  {
    key: 7,
    label: 'Withdraw Requests',
    icon: CiMoneyBill,
    route: '/admin/dashboard-withdraw-requests',
  },
  {
    key: 8,
    label: 'Settings',
    icon: AiOutlineSetting,
    route: '/user/profile',
  },
];

// Sidebar data for seller dashboard
export const sellerSidebarItems = [
  { key: 1, label: 'Dashboard', icon: RxDashboard, route: '/seller/dashboard' },
  {
    key: 2,
    label: 'All Orders',
    icon: FiShoppingBag,
    route: '/seller/dashboard-orders',
  },
  {
    key: 3,
    label: 'All Products',
    icon: FiPackage,
    route: '/seller/dashboard-products',
  },
  {
    key: 4,
    label: 'Add Product',
    icon: AiOutlineFolderAdd,
    route: '/seller/dashboard-create-product',
  },
  {
    key: 5,
    label: 'All Events',
    icon: MdOutlineLocalOffer,
    route: '/seller/dashboard-events',
  },
  {
    key: 6,
    label: 'Create Event',
    icon: VscNewFile,
    route: '/seller/dashboard-create-event',
  },
  {
    key: 7,
    label: 'Withdraw Money',
    icon: CiMoneyBill,
    route: '/seller/dashboard-withdraw-money',
  },
  {
    key: 8,
    label: 'Shop Inbox',
    icon: BiMessageSquareDetail,
    route: '/seller/dashboard-messages',
  },
  {
    key: 9,
    label: 'Coupon Codes',
    icon: AiOutlineGift,
    route: '/seller/dashboard-coupon-codes',
  },
  {
    key: 10,
    label: 'Refunds',
    icon: HiOutlineReceiptRefund,
    route: '/seller/dashboard-refund-orders',
  },
  {
    key: 11,
    label: 'Settings',
    icon: CiSettings,
    route: '/seller/dashboard-settings',
  },
];

// Sponsored Brands
export const sponsoredBrands = [
  { src: brand1, alt: 'Sony' },
  { src: brand2, alt: 'Huawei' },
  { src: brand3, alt: 'Dell' },
  { src: brand4, alt: 'Microsoft' },
  { src: brand5, alt: 'Play Station' },
  { src: brand6, alt: 'Amazone' },
];

// Branding data for homepage features
export const brandingData = [
  {
    id: 1,
    title: 'Free Shipping',
    Description: 'From all orders over 100$',
    icon: (
      <svg
        width='36'
        height='36'
        viewBox='0 0 36 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 1H5.63636V24.1818H35'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M34.9982 1H11.8164V18H34.9982V1Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M11.8164 7.18164H34.9982'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Daily Surprise Offers',
    Description: 'Save up to 25% off',
    icon: (
      <svg
        width='32'
        height='34'
        viewBox='0 0 32 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
        <path
          d='M30.7 2L29.5 10.85L20.5 9.65'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Affortable Prices',
    Description: 'Get Factory direct price',
    icon: (
      <svg
        width='32'
        height='35'
        viewBox='0 0 32 35'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
        <path
          d='M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
        <path
          d='M16 28V22'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
        <path
          d='M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Secure Payments',
    Description: '100% protected payments',
    icon: (
      <svg
        width='32'
        height='38'
        viewBox='0 0 32 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
        <path
          d='M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z'
          stroke='#1F2937'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='square'
        />
      </svg>
    ),
  },
];

// Categories data for homepage display
export const categoriesData = [
  {
    id: 1,
    title: 'Laptops & Computers',
    subTitle: '',
    image_Url: computers,
  },
  {
    id: 2,
    title: 'Phones & Tablets',
    subTitle: '',
    image_Url: phones,
  },
  {
    id: 3,
    title: 'Music & Audio',
    subTitle: '',
    image_Url: music,
  },
  {
    id: 4,
    title: 'Gaming & Gadgets',
    subTitle: '',
    image_Url: gaming,
  },
  {
    id: 5,
    title: 'Luxury Watches',
    subTitle: '',
    image_Url: watches,
  },
  {
    id: 6,
    title: 'Shirts & Tops',
    subTitle: '',
    image_Url: shirts,
  },
  {
    id: 7,
    title: 'Eyewear & Caps',
    subTitle: '',
    image_Url: caps,
  },
  {
    id: 8,
    title: 'Luxury Pants',
    subTitle: '',
    image_Url: pants,
  },
  {
    id: 9,
    title: 'Shoes & Sneakers',
    subTitle: '',
    image_Url: shoes,
  },
  {
    id: 10,
    title: 'Others',
    subTitle: '',
    image_Url: others,
  },
];

// Navigation items for header
export const navItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Best Selling',
    url: '/best-selling',
  },
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Events',
    url: '/events',
  },
  {
    title: 'FAQ',
    url: '/faq',
  },
];

// Footer links for different sections
export const footerProductLinks = [
  {
    name: 'Exclusive Moments',
  },
  {
    name: 'Trending Now',
  },
  {
    name: 'Our Selection',
  },
  {
    name: 'Knowledge Base',
  },
  {
    name: 'The Edit',
  },
];

// Footer links for company information
export const footercompanyLinks = [
  {
    name: 'Laptops & Computers',
  },
  {
    name: 'Phones & Tablets',
  },
  {
    name: 'Gaming & Gadgets',
  },
  {
    name: 'Music & Audio',
  },
  {
    name: 'Others',
  },
];

// Footer links for customer support
export const footerSupportLinks = [
  {
    name: 'FAQ',
  },
  {
    name: 'Contact Us',
  },
  {
    name: 'Live chat',
  },
  {
    name: 'Track Order',
  },
  {
    name: 'Need Help?',
  },
];

// FAQ data for homepage FAQ section
export const FaqData = [
  {
    question: 'How do I create an account?',
    answer:
      'Click on the Sign Up button at the top right and fill in your details. You will receive a confirmation email to activate your account.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of delivery. Please contact our support team with your order number to initiate a return.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'After your order is shipped, you will receive a tracking link via email. You can also track your order in your account dashboard.',
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can reach us at support@thesmartcart.com or call (555) 123-4567, Monday to Friday, 9am-5pm.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'Orders can be changed or canceled within 1 hour of placing them. After that, please contact support for assistance.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to select countries. Shipping options are available at checkout.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, Mastercard, PayPal, and Cash on Delivery.',
  },
  {
    question: 'Is my personal information safe?',
    answer:
      'Yes, we use industry-standard encryption and never share your data with third parties.',
  },
];
