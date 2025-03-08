import EmailAnalyzer from './components/EmailAnalyzer';
import BuyMeACoffee from './components/BuyMeACoffee';
import SocialLinks from './components/SocialLinks';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center">
      <EmailAnalyzer />
      <BuyMeACoffee />
      <SocialLinks />
    </div>
  );
}
