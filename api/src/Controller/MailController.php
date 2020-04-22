<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailController extends AbstractController
{

    const MAX_SIZE = 100;

    /**
     * @param MailerInterface $mailer
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Symfony\Component\Mailer\Exception\TransportExceptionInterface
     *
     * @Route("/api/email", methods={"POST"}, name="send_email")
     */
    public function sendEmail(MailerInterface $mailer, Request $request)
    {
        $content = \GuzzleHttp\json_decode($request->getContent());
        $chunks = [];
        $publicPath = $this->getParameter('kernel.project_dir') . '/public';

        if (!empty($content->to)) {
            $chunks = array_chunk($content->to,self::MAX_SIZE);

            foreach ($chunks as $chunk) {
                $email = (new Email())
                    ->from($content->from_)
                    ->subject($content->subject)
                    ->html($content->body);
                $email = $email->to(...$chunk);

                $mailer->send($email);
            }
        }

        if (!empty($content->cc)) {

            $chunks[] = $content->cc;

            $email = (new Email())
                ->from($content->from_)
                ->subject($content->subject)
                ->html($content->body)
                ->cc(...$content->cc);

            $mailer->send($email);
        }

//        $this->buildMailCr($mailer, $content->from_, $content->subject, $content->body, $chunks);

        return $this->json('email sent successfully ! ');
    }

    public function buildMailCr(MailerInterface $mailer, $from, $subject, $e_body, $chunks) {
        $body  = '<strong>Objet :</strong> ' . $subject . '<br>';
        $body .= '<strong>Corps :</strong> <i>' . $e_body . '</i><br><br>';
        $body .= '<strong>Nombre d\'envoi :</strong> ' . count($chunks) . '<br><br>';
        foreach ($chunks as $i => $chunk) {
            $body  .= '<br><strong>Envoi n°</strong> ' . ($i + 1) . '<br>';
            foreach ($chunk as $cpntact) {
                $body  .= $cpntact . '<br>';
            }
        }

        $email = (new Email())
            ->from($from)
            ->cc($from)
            ->subject('Compte rendu de votre envoi du ' . date('d/m/Y H:i:s'))
            ->html($body);

        $mailer->send($email);
    }
}

?>
