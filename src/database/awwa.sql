-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Giu 09, 2020 alle 13:45
-- Versione del server: 10.3.22-MariaDB-0+deb10u1
-- Versione PHP: 7.3.14-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awwa`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `commenti`
--

CREATE TABLE `commenti` (
  `id` int(11) NOT NULL,
  `id_utente` varchar(50) NOT NULL,
  `id_post` int(11) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `commenti`
--

INSERT INTO `commenti` (`id`, `id_utente`, `id_post`, `testo`, `data`) VALUES
(1, 'g.latrofa3@studenti.poliba.it', 4, 'bello', '2020-05-09 10:17:13.00000'),
(2, 'g.latrofa3@studenti.poliba.it', 5, 'non mi piace', '2020-05-09 10:21:36.00000'),
(11, 'vitodifonzo1998@gmail.com', 16, 'top commento', '2020-06-08 10:33:21.51920'),
(10, 'g.latrofa3@studenti.poliba.it', 8, 'vito scemo', '2020-05-10 15:23:15.31062'),
(9, 'g.latrofa3@studenti.poliba.it', 9, 'vito scemo', '2020-05-10 15:23:15.30364'),
(8, 'g.latrofa3@studenti.poliba.it', 9, 'test', '2020-05-10 15:22:01.39729'),
(12, 'vitodifonzo1998@gmail.com', 16, 'welaaa\r\n', '2020-06-08 10:34:57.60989'),
(13, 'vitodifonzo1998@gmail.com', 16, 'welaaa\r\n', '2020-06-08 10:34:57.61583'),
(14, 'vitodifonzo1998@gmail.com', 16, 'p', '2020-06-08 10:36:16.61706'),
(15, 'vitodifonzo1998@gmail.com', 16, 'p', '2020-06-08 10:36:16.68042'),
(16, 'g.latrofa3@studenti.poliba.it', 16, 'ciao vito', '2020-06-08 10:36:21.81499'),
(17, 'g.latrofa3@studenti.poliba.it', 16, 'secondo commento', '2020-06-08 10:36:44.48835'),
(18, 'vitodifonzo1998@gmail.com', 16, 'prova', '2020-06-08 10:37:29.88999'),
(19, 'vitodifonzo1998@gmail.com', 16, 'prova', '2020-06-08 10:37:29.98232'),
(20, '', 16, 'vito vito', '2020-06-08 10:42:16.48349'),
(21, 'g.latrofa3@studenti.poliba.it', 16, 'Vito non condivido quello che dici!', '2020-06-08 10:49:06.57445'),
(22, 'vitodifonzo1998@gmail.com', 19, 'Non sono d\'accordo.', '2020-06-08 10:53:40.77771'),
(23, 'g.latrofa3@studenti.poliba.it', 21, 'Siiii davvero bellooooo', '2020-06-08 10:56:43.62666'),
(24, 'vitodifonzo1998@gmail.com', 20, 'Spettacolare il fatto che le riprese siano originali. ', '2020-06-08 10:56:45.63381'),
(25, 'g.latrofa3@studenti.poliba.it', 23, 'Vorrei iniziarlo anch\'io...', '2020-06-08 10:58:36.92251');

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5),
  `titolo` varchar(50) NOT NULL,
  `testo` varchar(5000) NOT NULL,
  `id_serie` varchar(8) NOT NULL,
  `numero_stagione` varchar(2) NOT NULL,
  `numero_episodio` varchar(2) NOT NULL,
  `piace` int(11) NOT NULL DEFAULT 0,
  `dislike` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`id`, `email`, `data`, `titolo`, `testo`, `id_serie`, `numero_stagione`, `numero_episodio`, `piace`, `dislike`) VALUES
(23, 'barberioclaudio@yahoo.it', '2020-06-08 10:58:06.00114', 'dopo 6 anni, finalmente.', 'La parti in cui facevano vedere Eren e Mikasa da piccoli erano fatte così bene che mi hanno fatto veramente male al cuore', '1429', '3', '19', 13, 1),
(22, 'vitodifonzo1998@gmail.com', '2020-06-08 10:57:54.44485', 'Questo episodio potevano farlo meglio', 'Non mi è piaciuta la dinamica di questo episodio, potrebbe ferire le persone troppo sensibili', '56296', '1', '6', 12, 42),
(18, 'vitodifonzo1998@gmail.com', '2020-06-08 10:49:27.44401', 'Veramente bella ', 'Serie veramente bella che ti fa appassionare, in questa puntata ci sono molti colpi di scena', '56296', '2', '4', 43, 0),
(19, 'barberioclaudio@yahoo.it', '2020-06-08 10:52:46.89217', 'Uno degli episodi di Halloween più belli ', 'Troy è stato fantastico così come Abed. Il suo costumo l\'ho amato tantissimo, ma non quanto quello del preside.\nPoi adoro il tema ZOMBIE. Fa così tanto \"The Walking Dead\"', '18347', '2', '6', 12, 27),
(20, 'g.latrofa3@studenti.poliba.it', '2020-06-08 10:54:16.13510', 'Mamma mia che roba!', 'Spettacolare MJ! Peccato non aver potuto vivere quegli anni!', '79525', '1', '10', 17, 0),
(21, 'barberioclaudio@yahoo.it', '2020-06-08 10:54:45.00218', 'Un CAPOLAVORO assoluto', 'Poter vedere tutto il \"dietro le quinte\" di quello che è avvenuto in quell\'ultima stagione, con i commenti dei protagonisti è una rarità nel mondo sportivo.\nTutto perfetto, dall\'incastro dei filmati con le interviste di oggi e di allora ai flashback sugli inizi di carriera fino ai focus sulle vicende personali/familiari dei campionissimi NBA.\nThe Last Dance: voto 10+', '79525', '1', '10', 127, 15),
(16, 'vitodifonzo1998@gmail.com', '2020-06-08 10:29:35.83101', 'Uno degli episodi ', 'Una delle puntate più bella ed emozionanti in assoluto. La quinta stagione è superflua, la serie poteva finire cosi, ma il potere dei soldi comanda.', '2747', '1', '19', 27, 69),
(17, 'vitodifonzo1998@gmail.com', '2020-06-08 10:31:08.07918', ' commovente', 'Una delle puntate più bella ed emozionanti in assoluto. La quinta stagione è superflua, la serie poteva finire cosi, ma il potere dei soldi comanda.', '2288', '4', '22', 24, 69),
(24, 'vitodifonzo1998@gmail.com', '2020-06-08 11:44:58.60375', 'Ottimo spunto per la vita', 'Ti apre un mondo, e ti fa capire che per diventare ricco ci sono molte strade', '1396', '1', '5', 2, 15);

-- --------------------------------------------------------

--
-- Struttura della tabella `segnalazioni_commenti`
--

CREATE TABLE `segnalazioni_commenti` (
  `id` int(11) NOT NULL,
  `idCommento` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `segnalazioni_post`
--

CREATE TABLE `segnalazioni_post` (
  `id` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data` timestamp(5) NOT NULL DEFAULT current_timestamp(5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

--
-- Dump dei dati per la tabella `segnalazioni_post`
--

INSERT INTO `segnalazioni_post` (`id`, `idPost`, `email`, `data`) VALUES
(15, 24, 'severussnape1@gmail.com', '2020-06-09 10:16:49.39435');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `data_nascita` varchar(10) NOT NULL,
  `nazione` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nome_utente` varchar(15) NOT NULL,
  `password` varchar(32) NOT NULL,
  `immagine` longblob DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`nome`, `cognome`, `data_nascita`, `nazione`, `email`, `nome_utente`, `password`, `immagine`) VALUES
('Giuseppe', 'Latrofa', '1999-01-28', 'Italy', 'g.latrofa3@studenti.poliba.it', 'peppone', '014635095eeeda4945a6c17d0cfb6abb', NULL),
('SEVERUS', 'SNAPE', '1960-01-01', 'United Kingdom of Great Britain and Northern Ireland (the)', 'severussnape1@gmail.com', 'sevsnape1', 'a7d0eeb054b7cd7ccbf3041bc441c522', NULL),
('Tea', 'Bradascio', '2003-12-06', 'Italy', 'teabradascio116@gmail.com', 'Tea', 'a84dbf6576d553658df56a460ebf1d43', NULL),
('Vito', 'Difonzo', '1998-04-04', 'Italy', 'vitodifonzo1998@gmail.com', 'NbaVito', 'c5cf93d6d20677cda872de6a0fced145', NULL),
('Claudio', 'Barberio', '1998-02-15', 'Italy', 'barberioclaudio@yahoo.it', 'ClausBar98', 'ab45a5abf28889fbddbda629e3904131', NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commenti`
--
ALTER TABLE `commenti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utente` (`id_utente`),
  ADD KEY `id_post` (`id_post`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `segnalazioni_commenti`
--
ALTER TABLE `segnalazioni_commenti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCommento` (`idCommento`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `segnalazioni_post`
--
ALTER TABLE `segnalazioni_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`),
  ADD KEY `idPost` (`idPost`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `nome_utente` (`nome_utente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commenti`
--
ALTER TABLE `commenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT per la tabella `segnalazioni_commenti`
--
ALTER TABLE `segnalazioni_commenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT per la tabella `segnalazioni_post`
--
ALTER TABLE `segnalazioni_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
