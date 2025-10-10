import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Header />
      <main className="container py-12 flex-grow">
        <section className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <h3 className="font-semibold text-foreground">1. Terms</h3>
              <p>
                By accessing this Website, accessible from yourdomain.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
              </p>
              <h3 className="font-semibold text-foreground">2. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials on our Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on our Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
              <p>
                This will let us to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
              </p>
              <h3 className="font-semibold text-foreground">3. Disclaimer</h3>
              <p>
                All the materials on our Website are provided “as is”. We make no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, we do not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
              </p>
              <h3 className="font-semibold text-foreground">4. Limitations</h3>
              <p>
                Our company or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on our Website, even if we or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
              </p>
              <h3 className="font-semibold text-foreground">5. Revisions and Errata</h3>
              <p>
                The materials appearing on our Website may include technical, typographical, or photographic errors. We will not promise that any of the materials in this Website are accurate, complete, or current. We may change the materials contained on its Website at any time without notice. We do not make any commitment to update the materials.
              </p>
              <h3 className="font-semibold text-foreground">6. Links</h3>
              <p>
                We have not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by us of the site. The use of any linked website is at the user’s own risk.
              </p>
              <h3 className="font-semibold text-foreground">7. Site Terms of Use Modifications</h3>
              <p>
                We may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
              </p>
              <h3 className="font-semibold text-foreground">8. Governing Law</h3>
              <p>
                Any claim related to our Website shall be governed by the laws of our country without regards to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
