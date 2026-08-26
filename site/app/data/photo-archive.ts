export type ArchivePhoto = {
  id: string;
  year: '2025' | '2024' | '2023' | 'historical';
  sourceLabel: string;
  sourceFolder?: string;
  localSrc?: string;
  alt: string;
};

const ids2025 = [
'1sN2PuB1FFHj7Xiawe1NH4Nqd7P_5V4lV','1dCFTE1mmZeaY5NRtzsV02_wpBOwB6-ts','1uEI91A8NKUNFZ49i13YKuV-Id8GDNrLl','1z2Fu_6gvqNibsP0Yn95HsMUJW44Vuc8k','1ubjt8Rd3mlLgKTHTNi4AFg031L2EGhhk','1Ps0g6TJ3vgXVHRR_FWMBdqRQNdiijIEm','1-ROEyI4Gc4hD87blTnK6EBZlwYXWvlNK','17ufW94nmaEpCzavfepHPEIhr3iOKrWK3','1TJgfDHWGYPYQFUHJyFO7Tqp9LEYuAs79','1AYxCZtTxPuPO0brUlSGkrvxxOYzQFIJQ','1XgW-Q64kTlYRCGbyKdc3QHmaTsrnSy3E','10GzEnVIX7kgKbooFsSq3QnN_o8yfY84t','1KRelaTgSLFZSZ70aVUhQkFYiDvfe7uF-','1PMUTP6gdvXnQw2x0TNG1ur_X3rSDfigI','1sf_n97PkfwPYYAO8Pm5QjJQjOd-Hjjrt','15e_aoUsmK1nT53tNKtotRXexmAxlLk50','1t3k0q6l4NbLk6LrBgXWfyp60qRDCPkOb','13Ry6Z6hXGlWuK_jx85zDorFsb454neN-','1LAeOKDQkTTQVkRD3GrrQQAhCYEzxra5N','1J3S-JVq60nX2CL6fbkHECOC0luyozOcj','1p9n9RKvN1diFyB4_hedcnPZxMaA2n0yU','18NgA58VMUpvxH6Lgi7ac3rviXgOBKBsc','1wOk69TqHpu6Ovf-uapuh7SZn6iLaMgS2','1mMTqkChBCW1jdAbE38juwGhCA0C1C_Q1','1mL8SIfUytt4GEnstUA235L0sJ3gM8aDo','1PygPPo-VIu1d_BSBz2p2MWVc_8jkj5vo','1pmni1iudA_hgQa-gQrDV7FqoTz7W5NFe','1hU6fRL9wkE17gS28iEVBPHIUg5Wz5Bon','1FNACpZkfSrMzkL3eejuP2W4fdNJy2Bv7','1dX-pfTnl4lqbocGGxMRl0e8raXMu6yL8','15fyUT3d0IeW7dQaUFyiGA-sMS1M1QsI2','17qcAqaQ-GfvX6cXX3DKDlOcc9HINBc30','154SQbgraTekONFdaBnVXGt08-776pL1U','1lRDaVspJHVQ_UAlVchnB7kCH3_xreFUp','10VRhvJ99BNs82_jQ0P6oeGAimXNw5vih','1cGlHAzU9vFHtJ994Oz3RxEyIw9zQrTzX','1TbIToxXCg0mOS9y55aWuuYPGm0UKQ4fE','13o0lZuMcTcwaV6wqwswjNbbOEp3dkk0x','1mu6f8TEpj6w78iBlT-MxIKMqlHyJvrCe','1YSOyDlKQMjEHXZRgv4PH2xp7VPcUYXJu','1JPCklFVMbtH9FAZf2CbLzaaolPRmNb2n','14iHWpsHr4WjfH9iUttUoAqAJ8N-x6I4J','1TQM49T84O7HMw7JnN8p12D8ISuDj49oj','1RQuN2PaOQCBZkTvSk7ayzTo1R_WbW22K','1ydcmpnpkp_fygmxKXJ6uwSHtDpD2vei8','1mjAOPUv5X72VfIgDWFhZF2MIdIQ2LASX','1EZpiDA8--eqxKULrFVUavZCcykSxUqsc','1UB3hFFbTaCSeOdl2BE5hHF6SbHERM8Yn','1MdGwwQSNmC-MMVuVy5N3ChuSCsXiu4qL','19i54H8ZAweMarbufglqoOqbAFOcpoK5_','1cfwR1E0WnYnSxcSZDlOmSP7xxVUra1HZ','1uG46X-LP5t1FkMDh6f3d1ITdeN6UeCza','1-DsszOLud1P9i6uu95T72qrkQNZJD4BJ','1qRui-HZs4Tak9Hkhv9wbNOzgxUJWLRr6','1UsUVt9M4pviHtzfbce85IkHCVwHg5hOc'
];

const ids2024 = [
'1O0jLPYHSkrn9Xwi_ncv60gs2TpVg8WEe','15rCyuJh_whXhNKnf5b9NcIVnBEZJwxQp','1gFbsO_LW2AemgebvwOSdzNxFTTkLs95X','1EpTJ8oojUnHEX71xXVQ1gdGSXu7D8otn','1k2cYFctq1FBPpYErLV5KPflycGxrzx7r','1qZ20pgGFzhw2O5UxOKprc32x9VLG93aN','104Ex9VnNp583uVa9vJVqn96Xs4NmEzoM','1oGWOvE5_7ArB3UkMNRUQZ2puzbOD8Ltc','1Vu2qnHOhNa9f6_UoQYwwRkxL2dk3tMy_','1uoE0atqC3I2V0Z67AJY2OZOLjYID1O7y','1duudSLnuDGSMTU22n1Ik8gQBlL3QPNki','1n3ej-_WjI62-F8w7FrBsHCXyIVk_d2V8','1vhPVw-qNQD16rM_XVvwKgkYHhumBbYKJ','1rrkRW7royXfGtkC9SqUtxVbgcz0w-g3O','17ZhIoXecH8KfHHyNHI5AHhnsraRJRN94','1_oPcINU5hL-LVI--aJbtE-TtWRp8JEfo','1NA2KG7QND7Ml0tQEnPzEmZRSJE1zufeG','167_LxpdPu80xL5m4to7fmgON8zRLlD02','1SZEq31xO2gBSHHI6-af-FoQhGC6BGTTh','1rvci4wTcCHQGMBpSpinIl93uYyEuDx7H','1Y281YSf40TDHsy3qoT8q7d5IaQThHPQ3','1phfNSFCtB0nAYECZkcixXRhIbdX2kKWk','1gJhTwvktbPD-SPb4sK7r7OWz_RMG1u_u','1yk4BWdmB17si0pYaPNCdYyCCWGmG8Ceo','1sEMzZrj4DWy7EatamKX2d3BvDDVvZuqD','1P63f34LN11YNUnPJgIMP5qSMhF80Fq6x','1NvIv9XXyFy7zJ8wTecZQl0Uk6Z2TjE5N','1ZgPDgDdFmZU4CYOdH1Cyw011mpXS-vDx','1zLTguNBODLBba49lCKn2UgFU6iz2WfFd','1vywbCiqWabTf5TcduslwMB6O7XYf6cF_','17WCLGkxyTBduhga7ODzcxsxF698DdKXm','1ditG7asM_CCOyYzKoiIH3IzRM8WkboeT','1PnLE-C-dOG4ZYyP4Tv9tnc0Y4cWDthJj','1iVC47X3QJGXl8gD-MiV5Nx_szy553gnN','1aktujVyeNd6S77rj6ySThEx-2smW_7gW','1tM1wIyyVOFcYSlc1lxFkaUGbH5u84DaC','1xB2V82D4G9YmGeZRY-bN1zV1RMCbOyf6'
];

const ids2023 = [
'17pnX-NrHIXqdseItw2QtICUO7Co5Bh6a','10NhTh3P7P8HoLWE3VwJVR2tHRbnw9HW1','1azfVVqn4vpMxdv--_onh7HeGOW2MhSvT','1_wLMhS8YHHL5RMWkV_H1hw-uOpD_qZD9','1M0qxhRj84ocTbZcKBCq22ll6K-jh4PXz','17AN6d_vNo93SSyCo_ph5wyyEZIvbh7hA','1mNvs_ACthtLpHz6ZPU4WhfOKgzrCDT2O','1a219rL83uy_Y873DfX1lsF5w-EoRhXIo','1XIV7145AAVf90A_g_Hdobu372n7kxFy_','12MxxxuZJ3o3q9zXXQ371JHn2oAO159dS','1UmNV9t4scJYibKHXI3M35o3jESvynQ17','1wBmEb8R5BU6ACNd43qwuYUQklw5GoS6R','1PhmVRXF0O_u0v9Sy_HQNe6w_yN0LUlXU','1ZTOClGlAdqrtnbDngt3xF2SYu2wW76m8','1M62Xnxb1hxmoNf792q8zg7brDyx1ghJf','1kqpDE1XEmK-NwfzHQeq-3qWnip1ruGHq','1Mj9g-NIGoK8TgJ9evA8EwPbSJqOvRR3v','1ZesxWMJhl9OZTGaCuYAXruuN6x7tUoKQ','1zeLeSs_ajBn-zvH61-oS0Z0MHy72ie9v','14Jig_ZGhKLrgikUTY0Uf4KdRgcN3C9l-','1oHrJuhqrMI31iF5ykT5KNJwvjQ1tIpNC','1Pd5ghthXCyd7ZbP7HMdluj9Ob2Gg8qHI','1gjSWfNOpDSotLzSQRTHFIt9m94RqgpJq','1T00kTlStJE8cmOdOjhN97fVSnIn-BpFZ','1xCJYwFJhuwaOBd03sZDcS-ry2DdUB15r','1BTaQhsGcRtiN2MNoHwmMIGbucSXQSnBr','1m0rZJmLfZujOQ3sLo4KLC1vJgK-0qoU3','15UCBc35ndX0dggmv8WLdrXH4Eiuol8nj','1oJPJVCXW7Wsb03FO5dB-wZ65AV70c40w','1_GZ_5NN2BvpYswmDIIOtsCQztr_NW4zG','1u1u_OpNRj5c0bs435A3o8uQtK8Z4RmqS','1BPu2pJX8eue2B6SM62a4Gp9cy5-Div5_','1_3IRE1mLcMBn1B4mbHVHtRLbG-cdsIlU','19ADF6-djagJv_VRd8qqctTH5tpfoqA9n','1_YQL6lHgC__KqWyxDmrS-vCO-xzp83P4','1pAZnps6VIwLY2z5aX1NW7Nmz2rPvfPuM','1Fy10KQhuf7z-n9yr8FXgwSA1-BGFQ2Ll','1LOPHpMS4LkJgr6G3x41xPQnSxO1o8pvi','1ToneROZFJm1I8CphjFNZPVkHSQrmSOMB','11o9MRBPEbUqFqfHq4hiAu-wX4LOmZTeY','1lG-CjpFi5r-RqgE1cv0TlTybq4MzNdLQ','1r-jfpQgAhP2Ix5W85UX3lmqgdxHh_tR5','1d72744h8U5lf6kw24MsNtRn5YMCGokus','1cX-cAb5nrVitAZIm6X2RSZo1quSVEcsJ','18aOw5uqFrENFgabjPF5Ce3S7zQvCbfhD','1uM9qWVceMjJe0V4-0wdhwHUJ138TtyiV','1A2L60K88nMmL5rKu3xv1DU53X3FGFEcu','1gL7pnkUtbx-5hBH5AOYg_m4Xh4m8XLf_','1QESR3q4c00i3O7nkfMPjGGhvqIDG3IUR','1BonwidHkk4L2O8oeL4agzkeVB-rozmSf','1L_rQtX9msWuKgfaw9cM_f_Mzuss58Qj7','1cb8CJzwE5KhMAZz0fnRtpqFqoK5n6vAj','1z0LeZkybw_mk5E9SAhqpHtwoezmA9UCk','1UBxQHQQXJWv9rb42xJi9sG0heefmDQpb','113C_2uunyUsvB_BPKX-xm68bPTzbG-tU','1LnrX9sgaB6KaSRXPR91NIP3EnxfZLRpu','1SFNzv0sBv2AcjQXxvvYnRHZyYd4XZeUn','13_lMyN-Rs5cgtapMnGn8N-6QvHXnW5aw','1DHgrFwi08h9jYgwI3tRO_0T9fG-lry08','1G7iLTubvhM4gdGE-9z58R6WSCLePxMIG','1OqYNXaGq8Df5NCOe5AVMsmNnCAFL1EKU','1o1k-a0pcxl6YWNevKoJ2oI56bVsspB34','1Gely6y9Z6Q4nhzNo9zqxRy65oeKUNCcO','1v-PWuAIMZa2b0-HFxF3rgrS48kIbB9KN','1_QCWxZqTj1NTyKu7z35MF96BkZbiCttE','1_m1ZZORfgXpRTe_k_4rLySWVlY4bSEo9','1Ly1O3yZ1PPPZKWrVwG1b0k6_raXsxhmx','1QmaAjxtmEzGc6Dn_n9aTpdT8nC8Gy3JE','1lXiFk2GCxqcRh9P93pCTEkBL1GAtfjAa','1cKd4dQQtIpjdW_UJ0R0eUyX5SWAvuSHi','1HGxxrJ0puplTelUBmzWgprOzPnA7epg8','1AzKP5bghRcb9fHquZqPYQWc0Edm3V6X6','1ChFTjDD_ZsB1B-MF7pao4oRByDqgHepo','1FQt7haJz0mAkO9GNaPMah2Qhdn28oHrO','1Vv6doKQVsS7Lek9w6baMeS18DJ1SeF2i','1w_yHuEajD7QozCHxmRnJT8xbKD4yi24P','1hclvZE-aADxdkp4W8yzqyspBIn8ESb-N','1pW-vSR1CgKxq7_H8e3JIOgGZ5S2qiLCW','1FvYHVCeRuB-_PWkoczqk4DZ8B8Ue1oxY','1-RC7SgLPUT2jbTCcUGkIOMlbgmFwNAko','11bBD2yCY8ZNMNNPhEpw2tpWN1PWTm-mA','16b4VipEA-SR6LlPPJrWdm0vZ4eGyI44D','1LyYPdPXs3CODgjetAh1bO_bZ3foHgjA6','1Aypj-C-AhiYg14uB61yMQrmiANnGoz2C','1TBGIsOQNc274NZyx5v7KlJmzOhTDPS5n','1QFjUU58RvUR3uvGCI4AkhBxrJf8sKJ70','1TW251qKI2Ba2Mw5EBwHRwMoFA1nAdVIa','1jlJn-9yBxEdeZeqUyXAErUcdReihcPGY','1jWGMBo5QGgAzq-rJ5831q6ahQR482Krr','1UJRrxRrAQXuTYUyw0y4Gh27ByqfzXHY1','13MNUAd-ZUDpS8-8DrZz72VucKyMOmG3T','19JNt6hDs55ZRLo04K28DMs4GhCiRmHwr','1mihqmIE9nmUnRWno9m1t2Z5_lc4Lpig7','1jaBj2dQhVP2wqWeCHNNdeGBON8mrrIoG','1OQf0z1GXXmBt4pjEu15JZ414n9EgHklA','1CPuwpFmYerm5iZMBDe-DjiZdy9Wvc3Rx','1OyQxdsZKXY9yq7HRR8Fas6tcI7q0u7-U'
];

function fromDrive(ids: string[], year: '2025'|'2024'|'2023', label: string, sourceFolder: string): ArchivePhoto[] {
  return ids.map((id, index) => ({
    id,
    year,
    sourceLabel: label,
    sourceFolder,
    alt: `${label}, archive photograph ${index + 1}`,
  }));
}

const historical: ArchivePhoto[] = [
  ['historical-1967-1970.jpg','1967–70 Singing Hoosiers'],
  ['historical-1970.jpg','Singing Hoosiers, 1970'],
  ['janie-gordon-1980.jpg','Singing Hoosiers archive, 1980'],
  ['musicana-1980.jpg','Musicana era, 1980'],
  ['sh-1980s.png','Singing Hoosiers, 1980s'],
  ['singing-hoosiers-1995.jpg','Singing Hoosiers, 1995'],
  ['alex-dlugosz.jpg','Singing Hoosiers alumni archive'],
  ['george-sistevaris.jpg','Singing Hoosiers alumni archive'],
  ['teresa-fowler.jpg','Singing Hoosiers alumni archive'],
].map(([file,label], index) => ({
  id: `historical-${index + 1}`,
  year: 'historical',
  sourceLabel: label,
  localSrc: `/archive/${file}`,
  alt: label,
}));

export const photoArchive: ArchivePhoto[] = [
  ...fromDrive(ids2025, '2025', '75th Anniversary · April 5, 2025', 'https://drive.google.com/drive/folders/16ocPk_T5mfJAwYzUwwJLZ9WEV0sE8GoM'),
  ...fromDrive(ids2024, '2024', 'Alumni archive · 2024', 'https://drive.google.com/drive/folders/1NmnEw_V_VSYDhE5QmNPMFUDZqd6ubZNU'),
  ...fromDrive(ids2023, '2023', 'Alumni archive · 2023', 'https://drive.google.com/drive/folders/1QIv8SrLAg6SZnCXu2hRnwFGTfj0Bxtmk'),
  ...historical,
];

export const photoCounts = {
  total: photoArchive.length,
  '2025': ids2025.length,
  '2024': ids2024.length,
  '2023': ids2023.length,
  historical: historical.length,
};
