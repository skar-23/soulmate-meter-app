import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Calendar, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Helmet>
        <title>Terms of Service - Skar Love Calculator</title>
        <meta
          name="description"
          content="Read the terms of service for Skar Love Calculator. By using our website, you agree to these terms and conditions."
        />
        <meta
          name="keywords"
          content="skar love calculator terms and conditions, skar love app terms of use"
        />
      </Helmet>
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Terms of Service for Skar Love Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <h3 className="font-semibold text-foreground">1. Terms</h3>
              <p>
                By accessing this Website, accessible from skarlovecalculator.app, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
              </p>
              <h3 className="font-semibold text-foreground">2. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials on Skar Love Calculator's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on Skar Love Calculator's Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
              <p>
                This will let Skar Love Calculator to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
              </p>
              <h3 className="font-semibold text-foreground">3. Disclaimer</h3>
              <p>
                All the materials on Skar Love Calculator's Website are provided “as is”. Skar Love Calculator makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Skar Love Calculator does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
              </p>
              <h3 className="font-semibold text-foreground">4. Limitations</h3>
              <p>
                Skar Love Calculator or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on Skar Love Calculator's Website, even if we or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
              </p>
              <h3 className="font-semibold text-foreground">5. Revisions and Errata</h3>
              <p>
                The materials appearing on Skar Love Calculator's Website may include technical, typographical, or photographic errors. Skar Love Calculator will not promise that any of the materials in this Website are accurate, complete, or current. Skar Love Calculator may change the materials contained on its Website at any time without notice. Skar Love Calculator does not make any commitment to update the materials.
              </p>
              <h3 className="font-semibold text-foreground">6. Links</h3>
              <p>
                Skar Love Calculator has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Skar Love Calculator of the site. The use of any linked website is at the user’s own risk.
              </p>
              <h3 className="font-semibold text-foreground">7. Site Terms of Use Modifications</h3>
              <p>
                Skar Love Calculator may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
              </p>
              <h3 className="font-semibold text-foreground">8. Governing Law</h3>
              <p>
                Any claim related to Skar Love Calculator's Website shall be governed by the laws of our country without regards to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Explore More</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Name Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/name-calculator">Try Name Calculator →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-primary">
                    <Calendar className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Birthdate Match</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/dob-calculator">Try Date Calculator →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Numerology For Love</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/blog/numerology-for-love">Read Our Blog →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
