#!/usr/bin/env python3
"""Generira točne oblike zviježđa iz stvarnih RA/Dec koordinata (J2000).
Projekcija kao na karti neba: sjever gore, istok lijevo.
Ispisuje JSON biblioteku i ažurira slikovna pitanja u questions.json."""
import json, math

# (ime, RA u satima, Dec u stupnjevima, prividna magnituda)
CAT = {
 "orion": {
  "stars": [("Betelgeuse",5.919,7.407,0.42),("Bellatrix",5.418,6.350,1.64),
            ("Mintaka",5.533,-0.299,2.25),("Alnilam",5.604,-1.202,1.69),
            ("Alnitak",5.679,-1.943,1.74),("Saiph",5.796,-9.670,2.07),
            ("Rigel",5.242,-8.202,0.13),("Meissa",5.585,9.934,3.39)],
  "lines": [("Betelgeuse","Meissa"),("Meissa","Bellatrix"),("Bellatrix","Mintaka"),
            ("Mintaka","Alnilam"),("Alnilam","Alnitak"),("Alnitak","Betelgeuse"),
            ("Alnitak","Saiph"),("Mintaka","Rigel")]},
 "labud": {
  "stars": [("Deneb",20.690,45.280,1.25),("Sadr",20.371,40.257,2.23),
            ("EtaCyg",19.938,35.083,3.89),("Albireo",19.512,27.960,3.05),
            ("DeltaCyg",19.750,45.131,2.87),("IotaCyg",19.495,51.730,3.79),
            ("KappaCyg",19.285,53.368,3.80),("Gienah",20.770,33.970,2.48),
            ("ZetaCyg",21.216,30.227,3.21)],
  "lines": [("Deneb","Sadr"),("Sadr","EtaCyg"),("EtaCyg","Albireo"),
            ("KappaCyg","IotaCyg"),("IotaCyg","DeltaCyg"),("DeltaCyg","Sadr"),
            ("Sadr","Gienah"),("Gienah","ZetaCyg")]},
 "kasiopeja": {
  "stars": [("Caph",0.153,59.150,2.27),("Schedar",0.675,56.537,2.24),
            ("GammaCas",0.945,60.717,2.47),("Ruchbah",1.430,60.235,2.68),
            ("Segin",1.906,63.670,3.37)],
  "lines": [("Caph","Schedar"),("Schedar","GammaCas"),("GammaCas","Ruchbah"),("Ruchbah","Segin")]},
 "velikimedvjed": {
  "stars": [("Dubhe",11.062,61.751,1.79),("Merak",11.031,56.383,2.37),
            ("Phecda",11.897,53.695,2.44),("Megrez",12.257,57.033,3.31),
            ("Alioth",12.900,55.960,1.77),("Mizar",13.399,54.925,2.27),
            ("Alkaid",13.792,49.313,1.86)],
  "lines": [("Alkaid","Mizar"),("Mizar","Alioth"),("Alioth","Megrez"),
            ("Megrez","Dubhe"),("Dubhe","Merak"),("Merak","Phecda"),("Phecda","Megrez")]},
 "perzej": {
  "stars": [("Mirfak",3.405,49.861,1.79),("Algol",3.136,40.956,2.10),
            ("GammaPer",3.080,53.506,2.93),("DeltaPer",3.715,47.788,3.01),
            ("EpsilonPer",3.964,40.010,2.89),("ZetaPer",3.902,31.884,2.85),
            ("RhoPer",3.086,38.840,3.39),("KappaPer",3.158,44.857,3.80),
            ("XiPer",3.982,35.791,4.04)],
  "lines": [("GammaPer","Mirfak"),("Mirfak","DeltaPer"),("DeltaPer","EpsilonPer"),
            ("EpsilonPer","XiPer"),("XiPer","ZetaPer"),("Mirfak","KappaPer"),
            ("KappaPer","Algol"),("Algol","RhoPer")]},
 "lira": {
  "stars": [("Vega",18.616,38.784,0.03),("EpsilonLyr",18.739,39.673,4.59),
            ("ZetaLyr",18.746,37.605,4.36),("DeltaLyr",18.908,36.966,4.30),
            ("Sulafat",18.982,32.690,3.24),("Sheliak",18.835,33.363,3.52)],
  "lines": [("Vega","EpsilonLyr"),("Vega","ZetaLyr"),("ZetaLyr","DeltaLyr"),
            ("DeltaLyr","Sulafat"),("Sulafat","Sheliak"),("Sheliak","ZetaLyr")]},
 "orao": {
  "stars": [("Altair",19.846,8.868,0.76),("Tarazed",19.771,10.613,2.72),
            ("Alshain",19.922,6.407,3.71),("ZetaAql",19.090,13.863,2.99),
            ("DeltaAql",19.425,3.115,3.36),("EtaAql",19.874,1.006,3.87),
            ("ThetaAql",20.188,-0.822,3.24),("LambdaAql",19.104,-4.883,3.43)],
  "lines": [("Tarazed","Altair"),("Altair","Alshain"),("Altair","DeltaAql"),
            ("DeltaAql","ZetaAql"),("DeltaAql","LambdaAql"),("DeltaAql","EtaAql"),
            ("EtaAql","ThetaAql")]},
 "bik": {
  "stars": [("Aldebaran",4.599,16.509,0.86),("Elnath",5.438,28.608,1.65),
            ("ZetaTau",5.627,21.143,3.00),("GammaTau",4.330,15.628,3.65),
            ("DeltaTau",4.383,17.543,3.77),("EpsilonTau",4.477,19.180,3.53),
            ("LambdaTau",4.011,12.490,3.47),("Plejade",3.790,24.100,2.50)],
  "lines": [("GammaTau","DeltaTau"),("DeltaTau","EpsilonTau"),("EpsilonTau","Elnath"),
            ("GammaTau","Aldebaran"),("Aldebaran","ZetaTau"),("GammaTau","LambdaTau")]},
 "lav": {
  "stars": [("Regulus",10.139,11.967,1.36),("EtaLeo",10.122,16.763,3.48),
            ("Algieba",10.333,19.842,2.01),("ZetaLeo",10.278,23.417,3.43),
            ("MuLeo",9.879,26.007,3.88),("EpsilonLeo",9.764,23.774,2.97),
            ("Zosma",11.235,20.524,2.53),("Chertan",11.237,15.430,3.31),
            ("Denebola",11.818,14.572,2.14)],
  "lines": [("Regulus","EtaLeo"),("EtaLeo","Algieba"),("Algieba","ZetaLeo"),
            ("ZetaLeo","MuLeo"),("MuLeo","EpsilonLeo"),("Algieba","Zosma"),
            ("Zosma","Denebola"),("Denebola","Chertan"),("Chertan","Regulus"),
            ("Zosma","Chertan")]},
 "velikipas": {
  "stars": [("Sirijus",6.752,-16.716,-1.46),("Mirzam",6.378,-17.956,1.98),
            ("Wezen",7.140,-26.393,1.84),("Adhara",6.977,-28.972,1.50),
            ("Aludra",7.401,-29.303,2.45),("ZetaCMa",6.338,-30.063,3.02),
            ("O2CMa",7.050,-23.834,3.02)],
  "lines": [("Sirijus","Mirzam"),("Mirzam","ZetaCMa"),("Sirijus","O2CMa"),
            ("O2CMa","Wezen"),("Wezen","Adhara"),("Wezen","Aludra")]},
 "malipas": {
  "stars": [("Procion",7.655,5.225,0.34),("Gomeisa",7.453,8.289,2.89)],
  "lines": [("Procion","Gomeisa")]},
 "volar": {
  "stars": [("Arktur",14.261,19.182,-0.05),("EpsilonBoo",14.750,27.074,2.37),
            ("DeltaBoo",15.258,33.315,3.48),("BetaBoo",15.032,40.391,3.50),
            ("GammaBoo",14.535,38.308,3.03),("RhoBoo",14.530,30.371,3.58),
            ("EtaBoo",13.911,18.398,2.68),("ZetaBoo",14.686,13.729,3.78)],
  "lines": [("Arktur","EpsilonBoo"),("EpsilonBoo","DeltaBoo"),("DeltaBoo","BetaBoo"),
            ("BetaBoo","GammaBoo"),("GammaBoo","RhoBoo"),("RhoBoo","Arktur"),
            ("Arktur","EtaBoo"),("Arktur","ZetaBoo")]},
 "blizanci": {
  "stars": [("Kastor",7.577,31.888,1.58),("Poluks",7.755,28.026,1.14),
            ("Alhena",6.628,16.399,1.93),("MuGem",6.383,22.514,2.87),
            ("EpsilonGem",6.732,25.131,2.98),("DeltaGem",7.335,21.982,3.53),
            ("UpsilonGem",7.599,26.896,4.06),("TauGem",7.186,30.245,4.41)],
  "lines": [("Kastor","TauGem"),("TauGem","EpsilonGem"),("EpsilonGem","MuGem"),
            ("Poluks","UpsilonGem"),("UpsilonGem","DeltaGem"),("DeltaGem","Alhena")]},
 "skorpion": {
  "stars": [("Antares",16.490,-26.432,0.96),("Acrab",16.091,-19.805,2.62),
            ("Dschubba",16.006,-22.622,2.32),("PiSco",15.981,-26.114,2.89),
            ("SigmaSco",16.353,-25.593,2.89),("TauSco",16.599,-28.216,2.82),
            ("EpsilonSco",16.836,-34.293,2.29),("MuSco",16.864,-38.048,3.00),
            ("ZetaSco",16.909,-42.361,3.60),("EtaSco",17.202,-43.239,3.33),
            ("ThetaSco",17.622,-42.998,1.86),("IotaSco",17.793,-40.127,3.03),
            ("KappaSco",17.708,-39.030,2.39),("Shaula",17.560,-37.104,1.62)],
  "lines": [("Acrab","Dschubba"),("Dschubba","PiSco"),("Dschubba","SigmaSco"),
            ("SigmaSco","Antares"),("Antares","TauSco"),("TauSco","EpsilonSco"),
            ("EpsilonSco","MuSco"),("MuSco","ZetaSco"),("ZetaSco","EtaSco"),
            ("EtaSco","ThetaSco"),("ThetaSco","IotaSco"),("IotaSco","KappaSco"),
            ("KappaSco","Shaula")]},
 "kocijas": {
  "stars": [("Kapela",5.278,45.998,0.08),("Menkalinan",5.992,44.947,1.90),
            ("ThetaAur",5.995,37.213,2.65),("IotaAur",4.950,33.166,2.69),
            ("EpsilonAur",5.033,43.823,3.03),("EtaAur",5.108,41.234,3.18),
            ("Elnath",5.438,28.608,1.65)],
  "lines": [("Kapela","EpsilonAur"),("EpsilonAur","EtaAur"),("EtaAur","IotaAur"),
            ("IotaAur","Elnath"),("Elnath","ThetaAur"),("ThetaAur","Menkalinan"),
            ("Menkalinan","Kapela")]},
 "djevica": {
  "stars": [("Spika",13.420,-11.161,0.97),("Porrima",12.694,-1.449,2.74),
            ("Vindemiatrix",13.036,10.959,2.83),("DeltaVir",12.927,3.397,3.38),
            ("BetaVir",11.845,1.765,3.61),("EtaVir",12.332,-0.667,3.89),
            ("ZetaVir",13.578,-0.596,3.37)],
  "lines": [("BetaVir","EtaVir"),("EtaVir","Porrima"),("Porrima","DeltaVir"),
            ("DeltaVir","Vindemiatrix"),("Porrima","Spika"),("Spika","ZetaVir")]},
}

def project(cat, box_w=185, box_h=150):
    names = [s[0] for s in cat["stars"]]
    ras = [s[1] for s in cat["stars"]]
    decs = [s[2] for s in cat["stars"]]
    mags = [s[3] for s in cat["stars"]]
    ra0 = (min(ras)+max(ras))/2
    dec0 = (min(decs)+max(decs))/2
    cosd = math.cos(math.radians(dec0))
    # istok lijevo: veći RA -> manji x
    xs = [(ra0-ra)*15*cosd for ra in ras]
    ys = [(dec0-dec) for dec in decs]
    w = max(xs)-min(xs) or 1; h = max(ys)-min(ys) or 1
    s = min(box_w/w, box_h/h)
    cx = (min(xs)+max(xs))/2; cy = (min(ys)+max(ys))/2
    pts = [[round(95+(x-cx)*s,1), round(80+(y-cy)*s,1)] for x,y in zip(xs,ys)]
    mmin, mmax = min(mags), max(mags)
    span = (mmax-mmin) or 1
    rs = [round(3.6+2.9*(mmax-m)/span,1) for m in mags]
    stars = [[p[0],p[1],r] for p,r in zip(pts,rs)]
    idx = {n:i for i,n in enumerate(names)}
    lines = [[idx[a],idx[b]] for a,b in cat["lines"]]
    return {"stars":stars, "lines":lines, "names":names}

SKY = {k: project(v) for k,v in CAT.items()}
# mali medvjed: shematski oblik iz baze (blizu pola projekcija ne radi dobro)
SKY["malimedvjed"] = {"stars":[[12,20,5.5],[50,30,4.5],[86,40,4.5],[120,52,4.5],
                               [118,90,4.5],[172,102,5],[178,60,5]],
                      "lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
                      "names":["Sjevernjača","","","","","",""]}

json.dump(SKY, open("/tmp/sky.json","w"), ensure_ascii=False)
print("Biblioteka:", ", ".join(f"{k}({len(v['stars'])})" for k,v in SKY.items()))

# ---- ažuriraj slikovna pitanja u bazi na točne oblike ----
def shape(key, highlight=None, labels=None):
    s = SKY[key]
    out = {"type":"constellation","stars":s["stars"],"lines":s["lines"]}
    if highlight is not None: out["highlight"]=highlight
    if labels: out["labels"]=labels
    return out

def star_i(key,name): return SKY[key]["names"].index(name)

data = json.load(open("questions.json"))
byid = {q["id"]:q for q in data}
UP = 0
def setimg(qid, field, img):
    global UP
    if qid in byid: byid[qid][field]=img; UP+=1

ORI=lambda **kw: shape("orion", **kw)
b,r_,a = star_i("orion","Betelgeuse"), star_i("orion","Rigel"), star_i("orion","Alnilam")
belt=[star_i("orion",n) for n in ("Mintaka","Alnilam","Alnitak")]
setimg("Q0094","image", ORI())
setimg("Q0040","feedbackImage", ORI())
setimg("Q0061","feedbackImage", ORI(highlight=[b,r_], labels=[[b,"Betelgeuse",-74,-10],[r_,"Rigel",12,6]]))
setimg("Q0076","feedbackImage", ORI(highlight=belt, labels=[[a,"Orionov pojas",-92,34]]))
setimg("Q0091","image", shape("kasiopeja"))
setimg("Q0092","image", shape("velikimedvjed"))
si=star_i("velikipas","Sirijus")
setimg("Q0042","feedbackImage", shape("velikipas", highlight=si, labels=[[si,"Sirijus",-56,-4]]))
al=star_i("orao","Altair")
setimg("Q0026","feedbackImage", shape("orao", highlight=al, labels=[[al,"Altair",-50,-10]]))

json.dump(data, open("questions.json","w"), ensure_ascii=False, indent=1)
json.load(open("questions.json"))
print(f"Ažurirano {UP} slika u bazi; JSON valjan.")
