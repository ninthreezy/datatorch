import React from 'react'
import { NextPage } from 'next'
import {
  Text,
  Container,
  Heading,
  OrderedList,
  ListItem
} from '@chakra-ui/react'

const Index: NextPage = () => (
  <Container mt={5} maxWidth={'100ch'} maxH={'100vh'} overflow="scroll">
    <Heading>Terms of Use</Heading>
    <Text mt={2}>
      The following terms and conditions govern all use of the DataTorch.io
      website, or any other website owned and operated by DataTorch which
      incorporate these terms and conditions (the “Website”), including all
      content, services and support packages provided on via the Website. The
      Website is offered subject to your acceptance without modification of all
      of the terms and conditions contained herein and all other operating
      rules, policies (including, without limitation, procedures that may be
      published from time to time on this Website by DataTorch (collectively,
      the “Agreement”).
    </Text>

    <Text mt={2}>
      Please read this Agreement carefully before accessing or using the
      Website. By accessing or using any part of the Website, you agree to be
      bound by the terms and conditions of this Agreement. If you do not agree
      to all the terms and conditions of this Agreement, then you may not access
      the Website or use any of the services. If these terms and conditions are
      considered an offer by DataTorch, acceptance is expressly limited to these
      terms.
    </Text>

    <OrderedList>
      <ListItem>
        <Heading mt={2} size="md">
          Ownership
        </Heading>
        <Text mt={2}>
          Ownership, copyright and title of any dataset or code that is
          developed by DataTorch shall at all times remain with DataTorch. You
          shall not acquire directly, indirectly or by implication any title,
          copyright or ownership in the software or any parts thereof. We do not
          claim any ownership rights to the information that you submit to the
          DataTorch application itself, your datasets are yours.
        </Text>
      </ListItem>
      <ListItem>
        <Heading mt={2} size="md">
          Your Account and Website
        </Heading>
        <Text mt={2}>
          If you create an account on the Website, you are responsible for
          maintaining the security of your account, and you are fully
          responsible for all activities that occur under the account and any
          other actions taken in connection with the account. You must
          immediately notify DataTorch of any unauthorized use of your account
          or any other breaches of security. DataTorch will not be liable for
          any acts or omissions by You, including any damages of any kind
          incurred as a result of such acts or omissions.
        </Text>
      </ListItem>
      <ListItem>
        <Heading mt={2} size="md">
          Acceptable Use of Your Account
        </Heading>
        <Text mt={2}>
          By accepting this Agreement, you agree not to use, encourage, promote,
          or facilitate others to use, the Website or your account in a way that
          is harmful to others ("Acceptable Use"). Examples of harmful use
          include, but are not limited to, engaging in illegal or fraudulent
          activities, infringing upon others' intellectual property rights,
          distributing harmful or offensive content that is defamatory, obscene,
          abusive, an invasion of privacy, or harassing, violating the security
          or integrity of any computer, network or communications system, and
          taxing resources with activities such as cryptocurrency mining. You
          may not conduct external scans of any kind against DataTorch
          infrastructure without written permission from DataTorch. Furthermore,
          account name squatting is prohibited by DataTorch. Account names on
          DataTorch are administered to users on a first-come, first-serve
          basis. Accordingly, account names cannot be held or remain inactive
          for future use. Any attempts to purchase, solicit, or sell account
          names in any form may result in the permanent suspension of the
          account. DataTorch reserves the right to remove, rename, or close
          inactive accounts at its discretion.
        </Text>
      </ListItem>
      <ListItem>
        <Heading mt={2} size="md">
          Payment and Renewal for Subscriptions Purchased
        </Heading>
        <Text mt={2}>
          By selecting a subscription, you agree to pay DataTorch the
          subscription fees indicated for that service. Subscription fees are
          not refundable. The subscription fee will be specified on your
          invoice. Unless you notify DataTorch before the end of the applicable
          subscription period that you want to cancel the subscription will
          renew automatically. DataTorch reserves the right to adjust the rate
          at renewal time. You authorize us to collect the then-applicable
          subscription fee using any credit card or other payment mechanism we
          have on record for you.
        </Text>
      </ListItem>

      <ListItem>
        <Heading mt={2} size="md">
          Newsletter
        </Heading>
        <Text mt={2}>
          By creating an account on DataTorch website you give us permission to
          add your email address to the DataTorch newsletter. You can
          unsubscribe at any time by using the link at the bottom of the
          newsletter.
        </Text>
      </ListItem>

      <ListItem>
        <Heading mt={2} size="md">
          Responsibility of Website Visitors
        </Heading>
        <Text mt={2}>
          DataTorch has not reviewed, and cannot review, all of the material,
          including computer software, posted to the Website, and cannot
          therefore be responsible for that material’s content, use or effects.
          By operating the Website, DataTorch does not represent or imply that
          it endorses the material there posted, or that it believes such
          material to be accurate, useful or non-harmful. You are responsible
          for taking precautions as necessary to protect yourself and your
          computer systems from viruses, worms, Trojan horses, and other harmful
          or destructive content. The Website may contain content that is
          offensive, indecent, or otherwise objectionable, as well as content
          containing technical inaccuracies, typographical mistakes, and other
          errors. The Website may also contain material that violates the
          privacy or publicity rights, or infringes the intellectual property
          and other proprietary rights, of third parties, or the downloading,
          copying or use of which is subject to additional terms and conditions,
          stated or unstated. DataTorch disclaims any responsibility for any
          harm resulting from the use by visitors of the Website, or from any
          downloading by those visitors of content there posted. You are
          encouraged to report any violations of our Acceptable Use
          requirements.
        </Text>
      </ListItem>

      <ListItem>
        <Heading mt={2} size="md">
          Content Posted on Other Websites
        </Heading>
        <Text mt={2}>
          We have not reviewed, and cannot review, all of the material,
          including computer software, made available through the websites and
          webpages to which this website links, and that link to this website.{' '}
          DataTorch does not have any control over those non DataTorch websites
          and webpages, and is not responsible for their contents or their use.
          By linking to a non DataTorch website or webpage, DataTorch does not
          represent or imply that it endorses such website or webpage. You are
          responsible for taking precautions as necessary to protect yourself
          and your computer systems from viruses, worms, Trojan horses, and
          other harmful or destructive content. DataTorch disclaims any
          responsibility for any harm resulting from your use of non DataTorch
          websites and webpages.
        </Text>
      </ListItem>
    </OrderedList>
  </Container>
)

export default Index
