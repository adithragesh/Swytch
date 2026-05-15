# Swytch AI Fashion Ecommerce Design System
Version: 2.0

---

# Project Overview

Swytch is a modern AI-powered fashion ecommerce website that personalizes fashion recommendations based on user style preferences.

The experience should feel:
- Personalized
- Premium
- Modern
- Fashion-forward
- Minimal
- Editorial

The website should help users discover outfits and products based on their selected aesthetic/style.

Example:
User clicks:
- Men
- Women
- Kids

Then the website asks:
"Choose Your Style"

Options include:
- Traditional Wear
- Streetwear
- Gothic
- Bohemian
- Y2K
- Cottagecore
- Minimalist
- Athleisure
- Casual/Everyday
- Business Chic
- Vintage

Based on the selected style:
- Personalized products appear
- Matching outfits are shown
- Fashion recommendations update dynamically

---

# Website Type

Frontend Only

Use:
- HTML5
- CSS3
- Vanilla JavaScript

The website MUST be fully responsive.

---

# Brand Identity

Brand Name:
Swytch

Primary Font:
Amiko

Style:
Dark luxury fashion ecommerce

---

# Color Palette

Primary Button Color:
#708D81

Background Color:
#262626

Secondary Background:
#2E2E2E

Option Button Color:
#FFFFFF

Primary Text:
#FFFFFF

Secondary Text:
#D1D1D1

Border Color:
#444444

Sale Accent:
#FF5C5C

Footer Background:
#F2F2F2

Footer Text:
#262626

---

# Border Radius

Global Radius:
5px

Apply radius to:
- Buttons
- Cards
- Inputs
- Product images
- Category pills
- Style option cards

---

# Typography

Primary Font:
'Amiko', sans-serif
Primary Website Font:
Amiko

Logo Font:
Happy Monkey

Heading Sizes:
- Hero: 48px
- H1: 36px
- H2: 28px
- H3: 22px
- Body: 16px
- Small: 12px

Font Weights:
- Bold: 700
- Regular: 400

---

# Core Website Flow

1. User lands on homepage
2. User selects category:
   - Men
   - Women
   - Kids
3. User is shown style selection page
4. User chooses aesthetic/style
5. Website displays personalized fashion products
6. User browses products
7. User adds items to cart/wishlist

---

# Pages Required

- Homepage
- Style Selection Page
- Shop Page
- Product Page
- Wishlist Page
- Cart Page
- Login Page

---

# Homepage Design

## Navbar

Height:
72px

Background:
#708D81

Logo Styling:
- Use Happy Monkey font
- White text
- Slightly playful but premium
- Center aligned in navbar
- Maintain clean spacing

Layout:
- Hamburger menu left
- Swytch logo center
- Search icon right
- Cart icon right

Behavior:
- Sticky navbar
- Smooth transitions

---

## Category Section

Categories:
- Men
- Women
- Kids
- Accessories
- Bags
- Jewellery
- Footwear

Category Style:
- White background
- Dark text
- Radius 5px
- Horizontal scroll on mobile
- Padding 12px 18px

---

## Trending Section

Layout:
- Large editorial image cards
- Fashion-first design
- Minimal text overlays

Card Features:
- Rounded corners
- Hover zoom effect
- Large visuals
- Soft transitions

---

## Sale Banner

Large promotional section with:
- SALE typography
- Discount offer
- Coupon code
- Shop now button

---

# Style Selection Page

Purpose:
Allow users to choose their preferred fashion aesthetic.

Page Background:
#262626

Title:
"CHOOSE YOUR STYLE"

Style Options:
- Traditional wear
- Streetwear
- Gothic
- Bohemian (Boho)
- Y2K
- Cottagecore
- Minimalist
- Athleisure
- Casual/Everyday
- Business Chic
- Vintage

---

# Style Selection UI

Layout:
- Vertical stacked buttons
- Center aligned
- Spacious spacing

Button Style:
- White background
- Black text
- Radius 5px
- Large tap targets
- Smooth hover animation

Hover Effect:
- Slight scale increase
- Soft transition
- Background slightly darkens

Selected State:
- Background changes to #708D81
- Text becomes white

---

# Product Recommendation Section

Purpose:
Show personalized recommendations based on selected style.

Features:
- Dynamic product cards
- Outfit suggestions
- Fashion inspiration sections

Layout:
- Responsive grid
- Image-focused cards
- Minimal text

---

# Product Cards

Each product card contains:
- Product image
- Product name
- Price
- Wishlist icon
- Add to cart button

Hover Effects:
- Image zoom
- Card lift
- Smooth transitions

---

# Buttons

Primary Button:
- Background #708D81
- White text
- Radius 5px
- Padding 12px 20px

Secondary Button:
- White background
- Dark text

---

# Inputs

Style:
- Dark background
- White text
- Rounded corners
- Minimal borders

Focus Border:
#708D81

---

# Animations

Transition Speed:
0.3s ease

Allowed Effects:
- Fade in
- Hover scaling
- Card lift
- Smooth scrolling

Avoid:
- Heavy animations
- Overly flashy effects

---

# Responsive Design Requirements

The website MUST be fully responsive.

Use a mobile-first approach.

---

# Mobile Layout (320px - 767px)

- Single column layouts
- Horizontal scrolling categories
- Full width cards
- Touch-friendly buttons
- Compact spacing

Style Selection:
- Large stacked buttons
- Easy thumb interaction

---

# Tablet Layout (768px - 1023px)

- Two-column product grids
- Balanced spacing
- Flexible containers

---

# Desktop Layout (1024px+)

- Multi-column layouts
- Spacious fashion editorial feel
- Large imagery
- Centered content

---

# Responsive Behavior Rules

Use:
- Flexbox
- CSS Grid
- Media Queries

Preferred Units:
- rem
- %
- vw
- vh

Avoid:
- Fixed widths
- Horizontal overflow

---

# Frontend Functionalities

Implement:
- Responsive navbar
- Mobile hamburger menu
- Category selection
- Style selection interactions
- Product filtering UI
- Wishlist UI
- Cart UI
- Hover animations
- Smooth scrolling
- Responsive grids

Do NOT implement:
- Backend
- Real payments
- Database
- Authentication APIs

---

# File Structure

/swytch
│
├── index.html
├── styles.html
├── shop.html
├── product.html
├── wishlist.html
├── cart.html
├── login.html
│
├── /css
│   └── style.css
│
├── /js
│   └── app.js
│
├── /assets
│   ├── images
│   ├── icons
│   └── fonts

---

# UI Keywords

- Premium
- Personalized
- AI fashion
- Minimal
- Editorial
- Dark luxury
- Modern
- Clean
- Fashion-forward
- Elegant

---

# Final Notes

- Prioritize personalization
- Keep layouts minimal
- Focus heavily on imagery
- Maintain luxury fashion aesthetic
- Ensure responsiveness across all devices
- Keep animations smooth and lightweight

# End of File